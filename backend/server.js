require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const extractRouter = require("./routes/extract");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/extract", extractRouter);

// basic health
app.get("/ping", (req, res) => res.json({ ok: true, ts: Date.now() }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
