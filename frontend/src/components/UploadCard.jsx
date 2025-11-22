import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractFile } from "../utils/api";

export default function UploadCard() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const allowedExtensions = ["pdf", "png", "jpg", "jpeg"];

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const validateFile = (f) => {
    if (!f) {
      alert("Please select a file.");
      return false;
    }
    if (f.size > 16 * 1024 * 1024) {
      alert("File size exceeds 16MB limit.");
      return false;
    }
    const ext = f.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      alert("Invalid file type. Please upload PDF, PNG, JPG, or JPEG.");
      return false;
    }
    return true;
  };

  const handleFiles = (files) => {
    if (!files || !files.length) return;
    const f = files[0];
    if (!validateFile(f)) return;
    setFile(f);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 40);
  };

  const clearFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const dt = e.dataTransfer;
    handleFiles(dt.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to analyze.");
      return;
    }
    if (!validateFile(file)) return;

    try {
      setSubmitting(true);
      const data = await extractFile(file);
      // pass data to results page
      navigate("/results", { state: data });
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-card">
      <div className="card-body p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          {/* Upload area */}
          <div className="mb-4">
            <div
              id="uploadArea"
              className={
                "upload-area" + (dragOver ? " dragover text-white" : "")
              }
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <i className="fas fa-cloud-upload-alt upload-icon" />
              <div className="upload-text">Drag &amp; Drop Your File Here</div>
              <p className="upload-subtext">
                or click to browse files from your computer
              </p>
              <button
                type="button"
                className="btn upload-btn pulse"
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }}
              >
                <i className="fas fa-folder-open me-2" />
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="d-none"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Supported formats */}
            <div className="supported-formats mt-3">
              <p className="mb-2 text-center">
                <small className="text-muted">Supported Formats:</small>
              </p>
              <div className="d-flex flex-wrap justify-content-center">
                <span className="format-badge">PDF</span>
                <span className="format-badge">PNG</span>
                <span className="format-badge">JPG</span>
                <span className="format-badge">JPEG</span>
              </div>
              <p className="text-center mt-2 mb-0">
                <small className="text-muted">Maximum file size: 16MB</small>
              </p>
            </div>
          </div>

          {/* File info */}
          {file && (
            <div id="fileInfo" className="alert alert-info">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-file me-2" />
                  <strong>{file.name}</strong>
                  <span className="text-muted ms-2">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={clearFile}
                />
              </div>
              <div className="progress mt-2" style={{ height: "4px" }}>
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="btn analyze-btn mt-4"
            disabled={!file || submitting}
          >
            <i className="fas fa-chart-line me-2" />
            {submitting ? "Analyzing..." : "Analyze Content"}
          </button>
        </form>
      </div>
    </div>
  );
}
