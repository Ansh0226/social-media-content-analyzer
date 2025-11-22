import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />

        <div className="container hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">
              Boost Your Social Media Engagement with AI
            </h1>
            <p className="hero-subtitle">
              Analyze your content, get actionable insights, and maximize your
              social media impact with our advanced AI-powered analyzer.
            </p>
            <div className="hero-actions">
              <NavLink to="/analyze" className="btn primary-btn">
                <i className="fas fa-rocket me-2" />
                Start Analyzing Free
              </NavLink>

              <a href="#features" className="btn secondary-ghost">
                <i className="fas fa-play-circle me-2" />
                Learn More
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <i className="fas fa-analytics hero-icon" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div>
              <div className="stat-number-big">95%</div>
              <div className="stat-label-big">Accuracy Rate</div>
            </div>
            <div>
              <div className="stat-number-big">10K+</div>
              <div className="stat-label-big">Content Analyzed</div>
            </div>
            <div>
              <div className="stat-number-big">2.5x</div>
              <div className="stat-label-big">Engagement Boost</div>
            </div>
            <div>
              <div className="stat-number-big">24/7</div>
              <div className="stat-label-big">Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-file-pdf" />
              </div>
              <h4>PDF Text Extraction</h4>
              <p>
                Seamlessly extract text from PDFs while preserving structure and
                layout for accurate analysis.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-camera" />
              </div>
              <h4>Advanced OCR</h4>
              <p>
                Convert images or scanned documents into editable text using
                AI-driven OCR.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain" />
              </div>
              <h4>AI-Powered Insights</h4>
              <p>
                Receive intelligent suggestions to enhance engagement, tone, and
                audience impact.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar" />
              </div>
              <h4>Word Frequency Analysis</h4>
              <p>
                Visualize keyword frequency with charts and word clouds to
                uncover insights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hashtag" />
              </div>
              <h4>Smart Hashtag Suggestions</h4>
              <p>
                Get AI-generated hashtags tailored to your content and audience
                for better reach.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt" />
              </div>
              <h4>Platform Optimization</h4>
              <p>
                Optimize your content for Twitter, Instagram, Facebook, and
                LinkedIn with custom tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h5>Upload Content</h5>
              <p>Upload your PDF documents or images via drag-and-drop.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h5>AI Processing</h5>
              <p>Our AI extracts text and analyzes engagement potential.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h5>Get Insights</h5>
              <p>View detailed analytics and suggestions.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h5>Boost Engagement</h5>
              <p>Implement recommendations and watch your reach grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container">
          <h2>Ready to Transform Your Content?</h2>
          <p>
            Join thousands of content creators who boost their engagement with
            our AI analyzer.
          </p>
          <NavLink to="/analyze" className="btn primary-btn">
            <i className="fas fa-rocket me-2" />
            Start Analyzing Free
          </NavLink>
        </div>
      </section>
    </main>
  );
}
