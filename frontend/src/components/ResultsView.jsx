import React from "react";

export default function ResultsView({ data }) {
  if (!data) {
    return (
      <div className="main-card p-5 text-center">
        <p className="text-muted mb-0">
          No analysis loaded. Please upload a file on the Analyze page.
        </p>
      </div>
    );
  }

  const analysis = data.analysis || data;
  const engagement = analysis.engagement_score ?? 0;
  const hashtags = analysis.hashtags || analysis.recommended_hashtags || [];
  const keywords = analysis.keywords || analysis.topKeywords || [];
  const suggestions = analysis.suggestions || [];
  const text =
    analysis.fulltext ||
    analysis.text ||
    data.text ||
    data.extracted_text ||
    "";

  const sentimentScore =
    analysis.sentiment?.comparative ?? analysis.sentiment_score ?? 0;

  let sentimentText = "Neutral";
  if (sentimentScore > 0.1) sentimentText = "Positive";
  else if (sentimentScore < -0.1) sentimentText = "Negative";

  return (
    <>
      {/* Header + main score */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-6 fw-bold">Analysis Results</h1>
          {data.originalName && (
            <div className="file-info mt-2 p-2 rounded">
              <p className="mb-1">
                <strong>File:</strong> {data.originalName}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="main-card text-center py-5">
        <h2 className="mb-3">Engagement Score</h2>
        <div className="engagement-score mb-3">{engagement}/100</div>
        <p className="lead fs-5">
          {engagement >= 70
            ? "Excellent! Your content has great engagement potential."
            : engagement >= 50
            ? "Good content with room for improvement."
            : "Needs significant improvements for better engagement."}
        </p>
      </div>

      <div className="row">
        {/* Stats + sentiment */}
        <div className="col-lg-6">
          <div className="stat-card">
            <div className="stat-card-header">
              <i className="fas fa-chart-bar me-2" />
              Content Statistics
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4 mb-3">
                  <div className="border rounded p-3 bg-light">
                    <div className="h2 text-primary">
                      {text.split(/\s+/).filter(Boolean).length}
                    </div>
                    <small className="text-muted">Words</small>
                  </div>
                </div>
                <div className="col-4 mb-3">
                  <div className="border rounded p-3 bg-light">
                    <div className="h2 text-success">
                      {(text.match(/[.!?]/g) || []).length || 1}
                    </div>
                    <small className="text-muted">Sentences</small>
                  </div>
                </div>
                <div className="col-4 mb-3">
                  <div className="border rounded p-3 bg-light">
                    <div className="h2 text-warning">
                      {keywords.length || 0}
                    </div>
                    <small className="text-muted">Top Keywords</small>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-start">
                <h6>Sentiment Analysis</h6>
                <span className="badge bg-primary text-white me-2">
                  {sentimentScore.toFixed(3)} ({sentimentText})
                </span>
                <div className="progress mt-2">
                  <div
                    className="progress-bar"
                    style={{ width: `${(sentimentScore + 1) * 50}%` }}
                  />
                </div>
                <small className="text-muted">
                  Negative &larr; Neutral &rarr; Positive
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Hashtags */}
        <div className="col-lg-6">
          <div className="stat-card">
            <div className="stat-card-header">
              <i className="fas fa-hashtag me-2" />
              Recommended Hashtags
            </div>
            <div className="card-body text-center">
              {hashtags.length ? (
                <>
                  <div className="mb-3">
                    {hashtags.map((tag) => (
                      <span key={tag} className="hashtag-badge">
                        #{tag.replace(/^#/, "")}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn copy-btn"
                    onClick={async () => {
                      const textToCopy = hashtags
                        .map((h) => (h.startsWith("#") ? h : `#${h}`))
                        .join(" ");
                      try {
                        await navigator.clipboard.writeText(textToCopy);
                        alert("Hashtags copied!");
                      } catch {
                        alert("Failed to copy.");
                      }
                    }}
                  >
                    <i className="fas fa-copy me-2" />
                    Copy All
                  </button>
                </>
              ) : (
                <p className="text-muted mb-0">
                  No hashtag suggestions for this content.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyword list */}
      <div className="stat-card">
        <div className="stat-card-header">
          <i className="fas fa-chart-bar me-2" />
          Word Frequency Analysis
        </div>
        <div className="card-body">
          <h6>Top Keywords</h6>
          {keywords.length ? (
            <div className="table-responsive">
              <table className="table frequency-table mb-0">
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.slice(0, 15).map(([word, count]) => (
                    <tr key={word}>
                      <td>
                        <strong>{word}</strong>
                      </td>
                      <td>
                        <span className="badge bg-primary">{count}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted mb-0">
              No keyword statistics available for this text.
            </p>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="stat-card">
        <div className="stat-card-header">
          <i className="fas fa-lightbulb me-2" />
          Engagement Improvement Suggestions
        </div>
        <div className="card-body">
          {suggestions.length ? (
            <div className="row">
              {suggestions.map((s, i) => (
                <div key={i} className="col-lg-6 mb-3">
                  <div className="suggestion-item">
                    <i className="fas fa-check-circle text-success me-2" />
                    {s}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">
              No specific suggestions available.
            </p>
          )}
        </div>
      </div>

      {/* Extracted text */}
      <div className="stat-card">
        <div className="stat-card-header">
          <i className="fas fa-file-text me-2" />
          Extracted Text Preview
        </div>
        <div className="card-body">
          <div
            className="border rounded p-4 bg-light"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{text}</p>
          </div>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <small className="text-muted">
              <i className="fas fa-ruler me-1" />
              {text.length} characters
            </small>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(text);
                  alert("Text copied!");
                } catch {
                  alert("Failed to copy text.");
                }
              }}
            >
              <i className="fas fa-copy me-1" />
              Copy Text
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
