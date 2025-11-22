import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="results" element={<Results />} />
      </Route>
    </Routes>
  );
}
