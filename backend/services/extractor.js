// backend/services/extractor.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data"); // npm i form-data
const Tesseract = require("tesseract.js");

let pdfLib = null;
try {
  pdfLib = require("pdf-parse");
} catch (e) {
  // leave null, will throw in extractFromPDF with helpful message
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

  // try local tesseract worker if preferred
  if (preferLocal) {
    try {
      const worker = Tesseract.createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(filepath);
      await worker.terminate();
      if (text && text.trim()) return text.trim();
    } catch (e) {
      console.warn(
        "Local Tesseract attempt failed, will try fallback if available:",
        e.message || e
      );
    }
  }

  // fallback to OCR.Space if API key provided
  if (apiKey) {
    try {
      const text = await ocrSpaceFile(apiKey, filepath);
      if (text && text.trim()) return text.trim();
    } catch (e) {
      console.warn("OCR.Space fallback failed:", e.message || e);
    }
  }

  // final best-effort local attempt (non-worker pattern)
  try {
    const worker = Tesseract.createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(filepath);
    await worker.terminate();
    return (text || "").trim();
  } catch (e) {
    throw new Error("OCR failed: " + (e.message || e));
  }
}

module.exports = { extractFromPDF, extractFromImage };
