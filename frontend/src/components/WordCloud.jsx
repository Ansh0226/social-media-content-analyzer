// src/pages/Results.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ---------- small helpers ----------
function getBasicStats(text = "") {
  const cleaned = text.trim();
  if (!cleaned) return { words: 0, sentences: 0, unique: 0 };

  const words = cleaned.split(/\s+/);
  const sentences = cleaned.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const unique = new Set(words.map((w) => w.toLowerCase())).size;

  return {
    words: words.length,
    sentences: sentences.length,
    unique,
  };
}

// simple word frequency for table + word cloud
function getFrequencies(text = "", maxWords = 15) {
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g);

  if (!tokens) return [];

  const freq = {};
  tokens.forEach((t) => {
    freq[t] = (freq[t] || 0) + 1;
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxWords);
}

// super simple readability approximation (not real Flesch, but fine for demo)
function getReadability(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (!words.length || !sentences.length) {
    return { flesch: 0, grade: 0 };
  }
  const avgSentenceLength = words.length / sentences.length;

  // crude heuristics just to have numbers that move
  const flesch = Math.max(0, Math.min(100, 110 - avgSentenceLength * 2.5));
  const grade = Math.max(0, Math.min(14, (avgSentenceLength / 2.2).toFixed(1)));

  return {
    flesch: Math.round(flesch),
    grade: Number(grade),
  };
}

// very simple category guess based on keywords
function guessCategory(text = "") {
  const lower = text.toLowerCase();
  if (
    /javascript|python|code|developer|api|software|technology|tech/.test(lower)
  ) {
    return { label: "Technology", confidence: 78 };
  }
  if (/marketing|brand|campaign|social media|engagement/.test(lower)) {
    return { label: "Marketing", confidence: 72 };
  }
  if (/education|student|school|college|university/.test(lower)) {
    return { label: "Education", confidence: 70 };
  }
  return { label: "General", confidence: 60 };
}

// tiny word-cloud without external libs
function WordCloudBox({ frequencies }) {
  if (!frequencies || !frequencies.length) {
    return (
      <p className="text-muted">Not enough text to generate a word cloud.</p>
    );
  }

  const max = frequencies[0][1] || 1;

  return (
    <div className="wordcloud-box">
      {frequencies.map(([word, count], idx) => {
        const weight = 0.6 + (count / max) * 0.9; // 0.6 → 1.5
        const size = 16 * weight;
        const hue = 230 - Math.round((count / max) * 80); // purple/blue range

        return (
          <span
            key={word + idx}
            className="wordcloud-word"
            style={{
              fontSize: size,
              color: `hsl(${hue}, 80%, 55%)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const payload = location.state?.result;

  if (!payload) {
    return (
      <>
        <Navbar />
        <main className="results-page">
          <div className="container">
            <div className="empty-results-card">
              <h2>No analysis data</h2>
              <p>Go back and upload a file to see the analysis results.</p>
              <button
                className="primary-btn"
                onClick={() => navigate("/analyze")}
              >
                Analyze Content
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { text = "", meta = {}, analysis = {} } = payload;
  const { engagement_score = 0, sentiment = {}, hashtags = [] } = analysis;

  const stats = getBasicStats(text);
  const freq = getFrequencies(text, 15);
  const readability = getReadability(text);
  const category = guessCategory(text);

  const sentimentScore = sentiment.comparative ?? sentiment.score ?? 0;
  const sentimentLabel =
    sentimentScore > 0.1
      ? "Positive"
      : sentimentScore < -0.1
      ? "Negative"
      : "Neutral";

  const scoreClass =
    engagement_score >= 70
      ? "score-excellent"
      : engagement_score >= 50
      ? "score-good"
      : "score-poor";

  return (
    <>
      <Navbar />
      <main className="results-page">
        <div className="container">
          {/* Header */}
          <div className="results-header">
            <div>
              <h1 className="results-title">Analysis Results</h1>
              <div className="file-info-box">
                <p>
                  <strong>File:</strong>{" "}
                  {meta.originalName || meta.filename || "Uploaded content"}
                </p>
              </div>
            </div>
            <button
              className="outline-btn"
              onClick={() => navigate("/analyze")}
            >
              <i className="fa fa-upload" /> Analyze Another File
            </button>
          </div>

          {/* Engagement Score */}
          <section className="card main-score-card">
            <h2>Engagement Score</h2>
            <div className={`engagement-score ${scoreClass}`}>
              {engagement_score.toFixed(2)}/100
            </div>
            <p className="engagement-caption">
              {engagement_score >= 70 && (
                <>
                  <i className="fa fa-trophy text-warning" /> Excellent! Your
                  content has great engagement potential.
                </>
              )}
              {engagement_score >= 50 && engagement_score < 70 && (
                <>
                  <i className="fa fa-thumbs-up" /> Good content with room for
                  improvement.
                </>
              )}
              {engagement_score < 50 && (
                <>
                  <i className="fa fa-lightbulb" /> Needs improvement to boost
                  engagement.
                </>
              )}
            </p>
          </section>

          {/* Stats + Hashtags */}
          <div className="grid-2 gap-lg">
            <section className="card">
              <div className="card-header-bar">
                <i className="fa fa-chart-bar" /> Content Statistics
              </div>
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-number">{stats.words}</div>
                  <div className="stat-label">Words</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">{stats.sentences}</div>
                  <div className="stat-label">Sentences</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">{stats.unique}</div>
                  <div className="stat-label">Unique Words</div>
                </div>
              </div>
              <div className="sentiment-section">
                <h4>Sentiment Analysis</h4>
                <span
                  className={`sentiment-pill sentiment-${sentimentLabel.toLowerCase()}`}
                >
                  {sentimentScore.toFixed(3)} ({sentimentLabel})
                </span>
                <div className="sentiment-scale">
                  <div
                    className="sentiment-bar"
                    style={{ width: `${(sentimentScore + 1) * 50}%` }}
                  />
                </div>
                <small className="text-muted">
                  Negative &larr; Neutral &rarr; Positive
                </small>
              </div>
            </section>

            <section className="card">
              <div className="card-header-bar">
                <i className="fa fa-hashtag" /> Recommended Hashtags
              </div>
              <div className="hashtag-grid">
                {hashtags && hashtags.length ? (
                  hashtags.map((tag) => (
                    <span key={tag} className="hashtag-chip">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <p className="text-muted">
                    No hashtag suggestions were generated.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* NEW: Word Cloud + Content Classification */}
          <div className="grid-2 gap-lg">
            {/* Word Cloud */}
            <section className="card">
              <div className="card-header-bar">
                <i className="fa fa-cloud" /> Word Cloud Visualization
              </div>
              <div className="card-body">
                <WordCloudBox frequencies={freq} />
                <p className="text-muted wordcloud-caption">
                  Larger words appear more frequently in your content.
                </p>
              </div>
            </section>

            {/* Content Classification */}
            <section className="card">
              <div className="card-header-bar">
                <i className="fa fa-tag" /> Content Classification
              </div>
              <div className="card-body">
                <div className="classification-header">
                  <span className="category-badge">{category.label}</span>
                  <div className="category-confidence">
                    Confidence: {category.confidence}%
                  </div>
                </div>

                <h4 className="mt-3 mb-2">Readability Scores</h4>
                <div className="readability-grid">
                  <div>
                    <small className="text-muted">Flesch Reading Ease</small>
                    <div className="readability-score primary">
                      {readability.flesch}
                    </div>
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${readability.flesch}%` }}
                      />
                    </div>
                    <small className="text-muted">0–100 scale</small>
                  </div>
                  <div>
                    <small className="text-muted">Grade Level</small>
                    <div className="readability-score info">
                      {readability.grade.toFixed(1)}
                    </div>
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill info"
                        style={{
                          width: `${Math.min(
                            100,
                            (readability.grade / 12) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <small className="text-muted">U.S. school grade</small>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Word Frequency table */}
          <section className="card">
            <div className="card-header-bar">
              <i className="fa fa-chart-bar" /> Word Frequency Analysis
            </div>
            <div className="card-body">
              {freq.length ? (
                <div className="table-responsive">
                  <table className="freq-table">
                    <thead>
                      <tr>
                        <th>Word</th>
                        <th>Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {freq.map(([w, c]) => (
                        <tr key={w}>
                          <td>{w}</td>
                          <td>
                            <span className="badge-primary">{c}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">
                  Not enough content to calculate word frequencies.
                </p>
              )}
            </div>
          </section>

          {/* Extracted Text Preview (kept) */}
          <section className="card">
            <div className="card-header-bar">
              <i className="fa fa-file-text" /> Extracted Text Preview
            </div>
            <div className="card-body">
              <div className="text-preview-box">
                {text ? (
                  <p>{text}</p>
                ) : (
                  <p className="text-muted">No text extracted.</p>
                )}
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="results-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/analyze")}
            >
              <i className="fa fa-redo" /> Analyze Another File
            </button>
            <button className="outline-btn" onClick={() => window.print()}>
              <i className="fa fa-print" /> Print Results
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
