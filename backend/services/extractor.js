
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const Tesseract = require("tesseract.js");

let pdfLib = null;
try {
  pdfLib = require("pdf-parse");
} catch (e) {
  // if pdf-parse missing, we'll give a helpful error later
  pdfLib = null;
}

const OCR_SPACE_URL = "https://api.ocr.space/parse/image";

async function extractFromPDF(filepath) {
  if (!pdfLib) {
    throw new Error(
      "pdf-parse is not installed or could not be loaded. Run: npm install pdf-parse"
    );
  }

  // handle both CJS and ESM default export shapes
  const pdfFn =
    typeof pdfLib === "function"
      ? pdfLib
      : pdfLib && typeof pdfLib.default === "function"
      ? pdfLib.default
      : null;

  if (!pdfFn) {
    const keys =
      pdfLib && typeof pdfLib === "object"
        ? Object.keys(pdfLib)
        : String(pdfLib);
    throw new Error(
      "pdf-parse import is not a function. Imported value keys: " +
        JSON.stringify(keys)
    );
  }

  const dataBuffer = fs.readFileSync(filepath);
  const data = await pdfFn(dataBuffer);
  return data && data.text ? data.text.trim() : "";
}

async function ocrSpaceFile(apiKey, filePath) {
  if (!apiKey) throw new Error("OCR.Space API key not provided");

  const form = new FormData();
  form.append("apikey", apiKey);
  form.append("language", "eng");
  form.append("file", fs.createReadStream(filePath));

  const headers = form.getHeaders
    ? form.getHeaders()
    : { "Content-Type": "multipart/form-data" };

  const resp = await axios.post(OCR_SPACE_URL, form, {
    headers,
    timeout: 60000,
  });
  const j = resp.data;
  if (j.IsErroredOnProcessing)
    throw new Error("OCR.Space error: " + JSON.stringify(j));
  const parsed = j.ParsedResults || [];
  return parsed
    .map((p) => p.ParsedText || "")
    .join("\n")
    .trim();
}

async function extractFromImage(filepath, opts = {}) {
  const preferLocal = opts.preferLocal !== undefined ? opts.preferLocal : true;
  const apiKey = opts.ocrKey || null;

  // 1) Try local Tesseract.recognize() (single-shot)
  if (preferLocal) {
    try {
      // recognize accepts a path or buffer and language string
      // We call it directly to avoid worker lifecycle incompatibilities
      const res = await Tesseract.recognize(filepath, "eng", {});
      const text = res && res.data && res.data.text ? res.data.text : "";
      if (text && text.trim()) return text.trim();
    } catch (e) {
      console.warn(
        "Local Tesseract.recognize() failed, will try fallback if available:",
        e.message || e
      );
    }
  }

  // 2) Fallback: OCR.Space remote API if key provided
  if (apiKey) {
    try {
      const text = await ocrSpaceFile(apiKey, filepath);
      if (text && text.trim()) return text.trim();
    } catch (e) {
      console.warn("OCR.Space fallback failed:", e.message || e);
    }
  }

  // 3) Final attempt: local recognize again (best-effort)
  try {
    const res = await Tesseract.recognize(filepath, "eng", {});
    const text = res && res.data && res.data.text ? res.data.text : "";
    return (text || "").trim();
  } catch (e) {
    throw new Error("OCR failed: " + (e.message || e));
  }
}

module.exports = { extractFromPDF, extractFromImage };
