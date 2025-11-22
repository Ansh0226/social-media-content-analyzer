import React from "react";

export default function PlatformCard({ name, score, status, suggestion }) {
  const badgeColor =
    status === "Perfect" || status === "Great" || status === "Optimal"
      ? "bg-emerald-500"
      : status === "Good"
      ? "bg-amber-400"
      : "bg-rose-500";

  return (
    <div className="platform-card bg-white rounded-lg p-4 shadow-sm text-center h-full">
      <div className="platform-icon text-3xl mb-2 text-indigo-500">
        <i className="fas fa-share-alt" />
      </div>
      <h6 className="font-semibold text-slate-800 mb-1">{name}</h6>
      <div className="text-2xl font-bold mb-1">{score}/100</div>
      <span
        className={`${badgeColor} inline-block text-white text-xs px-3 py-1 rounded-full mb-2`}
      >
        {status}
      </span>
      <p className="text-xs text-slate-500">{suggestion}</p>
    </div>
  );
}
