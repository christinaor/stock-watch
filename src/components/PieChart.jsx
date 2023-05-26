import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ graphData }) {
  const [startingTotal, setStartingTotal] = useState(0);

  useEffect(() => {
    const getInvestmentTotal = () =>
      graphData.reduce(
        (total, current) => total + current.initial_investment,
        0
      );
    setStartingTotal(getInvestmentTotal);
  }, [startingTotal]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `initial investment: $${startingTotal} on : ${graphData[0].investment_date}`,
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: graphData.map((n) => n.stock_name),
    datasets: [
      {
        label: "allocation %",
        data: graphData.map((a) => a.allocation * 100),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ].slice(0, graphData.length),
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ].slice(0, graphData.length),
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie options={options} data={data} />
    </>
  );
}
