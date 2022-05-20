import { Legend } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DashboardChart = () => {
  const data = {
    labels: ["Sick Leave", "Normal Leave", "Parental Leave"],
    datasets: [
      {
        label: "Sick Leave Remaining",
        data: [15, 1, 14],
        backgroundColor: ["#000000", "#0DA5E9", "#CFD8DC"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={data}
        height={350}
        options={{
          aspectRatio: 2,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              align:"center",
            },
          },
        }}
      />
    </div>
  );
};

export default DashboardChart;
