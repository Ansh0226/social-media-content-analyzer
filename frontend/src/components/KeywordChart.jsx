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

export default function KeywordChart({ keywords }) {
  const labels = keywords.slice(0, 10).map((k) => k[0]);
  const data = keywords.slice(0, 10).map((k) => k[1]);

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Frequency",
            data,
            backgroundColor: "rgba(99,102,241,0.7)",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
      }}
    />
  );
}
