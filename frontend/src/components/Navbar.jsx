import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-navbar-wrapper">
      <nav className="site-navbar">
        <div className="container nav-inner">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-chart-line" /> ContentAnalyzer
          </Link>

          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <label htmlFor="nav-toggle" className="nav-toggle-btn">
            <span />
          </label>

          <div className="nav-links">
            <NavLink end to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/analyze" className="nav-link">
              Analyze
            </NavLink>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how-it-works" className="nav-link">
              How It Works
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
