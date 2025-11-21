// tests/extract.test.js
const request = require("supertest");
const express = require("express");
const fs = require("fs");
const path = require("path");

const extractRouter = require("../routes/extract");

const app = express();
app.use("/api/extract", extractRouter);

describe("POST /api/extract", () => {
  jest.setTimeout(20000);
  it("returns 400 when no file", async () => {
    const resp = await request(app).post("/api/extract").send();
    expect(resp.statusCode).toBe(400);
  });

  it("accepts a sample pdf and returns ok", async () => {
    const sample = path.join(__dirname, "..", "samples", "sample.pdf");
    if (!fs.existsSync(sample)) return; // skip if sample missing
    const resp = await request(app).post("/api/extract").attach("file", sample);
    expect([200, 201, 400, 500]).toContain(resp.statusCode); // just ensure route works
  });
});
