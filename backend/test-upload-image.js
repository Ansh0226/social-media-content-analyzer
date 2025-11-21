// backend/test-upload-image.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

async function run() {
  try {
    // <-- Update this path if you moved the file
    const filePath =
      "../backend/samples/sampleimage.png";
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      process.exit(1);
    }

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const resp = await axios.post("http://localhost:4000/api/extract", form, {
      headers: form.getHeaders(),
      timeout: 120000,
    });

    console.log("=== RESPONSE ===");
    console.log(JSON.stringify(resp.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error(
        "Server responded with error:",
        err.response.status,
        err.response.data
      );
    } else {
      console.error("Request failed:", err.message);
    }
    process.exit(1);
  }
}

run();
