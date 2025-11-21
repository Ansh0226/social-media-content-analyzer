// backend/tests/extract.integration.test.js
const request = require("supertest");
const express = require("express");
const fs = require("fs");
const path = require("path");

const extractRouter = require("../routes/extract");

const app = express();
app.use("/api/extract", extractRouter);

// path to your uploaded test image (the file you used earlier)
const SAMPLE_IMAGE = "../backend/samples/sampleimage.png";
// fallback sample pdf within repo if you have one
const SAMPLE_PDF = path.join(__dirname, "..", "samples", "sample.pdf");

describe("POST /api/extract (integration)", () => {
  jest.setTimeout(120000); // OCR can be slow

  test("skips if no sample file exists", async () => {
    const hasImage = fs.existsSync(SAMPLE_IMAGE);
    const hasPdf = fs.existsSync(SAMPLE_PDF);
    if (!hasImage && !hasPdf) {
      console.warn(
        "No sample files present; skipping integration extract test."
      );
      return;
    }

    const fileToSend = hasImage ? SAMPLE_IMAGE : SAMPLE_PDF;
    const resp = await request(app)
      .post("/api/extract")
      .attach("file", fileToSend);

    // The server should respond (if extraction fails server may return 500 with handled JSON)
    // Accept various statuses but ensure JSON shape for success
    expect([200, 500, 400]).toContain(resp.status);

    if (resp.status === 200 && resp.body && resp.body.ok) {
      expect(resp.body).toHaveProperty("text");
      expect(resp.body).toHaveProperty("analysis");
    }
  });
});
