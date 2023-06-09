import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState } from 'react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props) {
  const { graphData, currentGraphData } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `initial stock prices in $ on: ${graphData[0].investment_date}`,
      },
    },
    maintainAspectRatio: false,
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: [labels[graphData[0].investment_date.charAt(6)], labels[4]],
    datasets: graphData.map((stock, i) => {
      return {
        label: stock.stock_name,
        data: [stock.price_of_stock, currentGraphData[i].close],
        borderColor: ["rgb(255, 99, 132)", "rgb(53, 162, 235)","rgba(170, 255, 0, 1)","rgb(251, 255, 0, 1)","rgb(255, 136, 0);"].slice(0, i + 1),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(170, 255, 0, 1)",
          "rgb(251, 255, 0, 1)",
          "rgb(255, 136, 0);",
        ].slice(0, i + 1),
      };
    }),
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}

export default LineChart;
