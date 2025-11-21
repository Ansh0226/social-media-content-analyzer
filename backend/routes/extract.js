// routes/extract.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { extractFromPDF, extractFromImage } = require("../services/extractor");
const { analyzeText } = require("../services/analysis");

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_CONTENT_LENGTH || 20 * 1024 * 1024, 10),
  },
});

function allowed(ext) {
  const ALLOWED = [".pdf", ".png", ".jpg", ".jpeg", ".tiff", ".bmp", ".webp"];
  return ALLOWED.includes(ext.toLowerCase());
}

async function cleanupFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (e) {
    /* ignore */
  }
}

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ ok: false, error: "No file uploaded" });
  const filepath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();

  if (!allowed(ext)) {
    await cleanupFile(filepath);
    return res.status(400).json({ ok: false, error: "Unsupported file type" });
  }

  try {
    let text = "";
    if (ext === ".pdf") {
      text = await extractFromPDF(filepath);
    } else {
      const preferLocal =
        (process.env.PREFER_LOCAL_TESSERACT || "true").toLowerCase() === "true";
      const ocrKey = process.env.OCR_SPACE_API_KEY || null;
      text = await extractFromImage(filepath, { preferLocal, ocrKey });
    }

    if (!text || !text.trim()) {
      await cleanupFile(filepath);
      return res
        .status(200)
        .json({
          ok: true,
          text: "",
          analysis: null,
          message: "No text extracted",
        });
    }

    const analysis = await analyzeText(text);

    // cleanup file
    await cleanupFile(filepath);

    return res.json({
      ok: true,
      filename: req.file.originalname,
      text,
      meta: { chars: text.length },
      analysis,
    });
  } catch (err) {
    await cleanupFile(filepath);
    console.error("Extraction error:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Extraction failed", details: err.message });
  }
});

module.exports = router;
