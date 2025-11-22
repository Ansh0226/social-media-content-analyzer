import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <i className="fas fa-chart-line" />
              ContentAnalyzer
            </div>
            <p className="footer-desc">
              AI-powered social media content analysis to maximize your
              engagement and reach.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/analyze">Analyze</Link>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#!">Help Center</a>
              </li>
              <li>
                <a href="#!">Contact Us</a>
              </li>
              <li>
                <a href="#!">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 Social Media Content Analyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
