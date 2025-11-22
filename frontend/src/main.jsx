import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import ResultsPage from "./pages/Results";
import "./styles.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
