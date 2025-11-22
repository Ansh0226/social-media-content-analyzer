import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function KeywordChart({ keywords = [] }) {
  if (!keywords.length) return null;

  const labels = keywords.map(([word]) => word);
  const values = keywords.map(([, count]) => count);

  const data = {
    labels,
    datasets: [
      {
        label: "Frequency",
        data: values,
        backgroundColor: "rgba(99,102,241,0.8)",
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <h3 className="font-semibold mb-3 text-slate-800">
        Top Keyword Frequency
      </h3>
      <Bar data={data} options={{ plugins: { legend: { display: false } } }} />
    </div>
  );
}
