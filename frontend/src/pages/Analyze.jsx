import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [fileSizeLabel, setFileSizeLabel] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f) return;
    setError("");

    const maxBytes = 16 * 1024 * 1024;
    if (f.size > maxBytes) {
      setError("File size exceeds 16MB limit.");
      setFile(null);
      return;
    }

    const ext = f.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "png", "jpg", "jpeg"];
    if (!allowed.includes(ext)) {
      setError("Invalid file type. Use PDF, PNG, JPG, or JPEG.");
      setFile(null);
      return;
    }

    setFile(f);
    setFileSizeLabel(formatFileSize(f.size));
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 40);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    if (dt.files && dt.files[0]) {
      handleFile(dt.files[0]);
    }
    e.currentTarget.classList.remove("dragover");
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("dragover");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("dragover");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a file to analyze.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/api/extract`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json();
      navigate("/results", { state: { result: data } });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="upload-page">
      <div className="container">
        <div className="upload-header">
          <h1>Analyze Your Content</h1>
          <p>
            Upload your social media content and get AI-powered engagement
            insights in seconds.
          </p>
        </div>

        {/* Upload card */}
        <div className="upload-card">
          <form onSubmit={handleSubmit} noValidate>
            <div
              id="uploadArea"
              className="upload-area"
              onDrop={onDrop}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <i className="fas fa-cloud-upload-alt upload-icon" />
              <div className="upload-text">Drag & Drop Your File Here</div>
              <p className="upload-subtext">
                or click to browse files from your computer
              </p>
              <button
                type="button"
                className="upload-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("fileInput")?.click();
                }}
              >
                <i className="fas fa-folder-open" /> Choose File
              </button>
              <input
                id="fileInput"
                type="file"
                className="d-none"
                style={{ display: "none" }}
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {file && (
              <div className="file-info">
                <div className="file-info-main">
                  <div>
                    <i className="fas fa-file" /> <strong>{file.name}</strong>{" "}
                    <span>({fileSizeLabel})</span>
                  </div>
                  <button
                    type="button"
                    className="outline-btn"
                    style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                    onClick={() => {
                      setFile(null);
                      setProgress(0);
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div className="file-progress-track">
                  <div
                    className="file-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {error && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.85rem",
                  marginTop: "10px",
                }}
              >
                <i className="fas fa-exclamation-circle" /> {error}
              </p>
            )}

            <button
              type="submit"
              className="btn primary-btn analyze-btn"
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: 8 }}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <i className="fas fa-chart-line" /> Analyze Content
                </>
              )}
            </button>
          </form>
        </div>

        {/* Features under card */}
        <div className="upload-features-row">
          <div className="upload-feature">
            <div className="upload-feature-icon">
              <i className="fas fa-bolt" />
            </div>
            <div>
              <div className="upload-feature-title">Fast Processing</div>
              <div className="upload-feature-text">
                Quick analysis in seconds.
              </div>
            </div>
          </div>

          <div className="upload-feature">
            <div className="upload-feature-icon">
              <i className="fas fa-shield-alt" />
            </div>
            <div>
              <div className="upload-feature-title">Secure &amp; Private</div>
              <div className="upload-feature-text">
                Your files are processed securely.
              </div>
            </div>
          </div>

          <div className="upload-feature">
            <div className="upload-feature-icon">
              <i className="fas fa-chart-pie" />
            </div>
            <div>
              <div className="upload-feature-title">Detailed Analytics</div>
              <div className="upload-feature-text">Comprehensive insights.</div>
            </div>
          </div>
        </div>

        {/* How it works small strip */}
        <div className="upload-how-card">
          <h5>
            <i className="fas fa-info-circle" /> How It Works
          </h5>
          <div className="upload-how-steps">
            <div className="upload-how-step">
              <span className="badge">1</span>
              <span>Upload PDF or image file</span>
            </div>
            <div className="upload-how-step">
              <span className="badge">2</span>
              <span>AI extracts and analyzes text</span>
            </div>
            <div className="upload-how-step">
              <span className="badge">3</span>
              <span>Get engagement scores</span>
            </div>
            <div className="upload-how-step">
              <span className="badge">4</span>
              <span>Receive improvement suggestions</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
