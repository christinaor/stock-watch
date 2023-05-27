import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const [startingTotal, setStartingTotal] = useState(0);
  const [currentAllocations, setCurrentAllocations] = useState([]);

  const { graphData, currentGraphData } = props;

  useEffect(() => {
    const getInvestmentTotal = () =>
      graphData.reduce(
        (total, current) => total + current.initial_investment,
        0
      );
    setStartingTotal(getInvestmentTotal);
  }, [startingTotal]);

  useEffect(() => {
    const numberOfStocks = graphData.map((s) => s.number_stocks);
    const stockPrices = currentGraphData.map((s) => s.close);
    const stockInvestments = stockPrices.map((p, i) => p * numberOfStocks[i]);
    const totalInvestments = stockInvestments.reduce(
      (total, currentAmount) => total + currentAmount,
      0
    );
    const newAllocations = stockInvestments.map(
      (t) => (totalInvestments / t) * 100
    );
    const totalAllocations = newAllocations.reduce((total, a) => total + a, 0);
    let roundedAllocations;
    if (totalAllocations < 100) {
      let rem = 100 - totalAllocations;
      roundedAllocations = totalAllocations.map(
        (a) => a + rem / newAllocations.length
      );
    } else {
      let rem = totalAllocations - 100;
      roundedAllocations = totalAllocations - rem;
    }
    setCurrentAllocations(roundedAllocations);
  }, [currentAllocations]);

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

  const currentData = {
    labels: graphData.map((n) => n.stock_name),
    datasets: [
      {
        label: "allocation %",
        data: currentAllocations.map((a) => a),
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
      <Pie options={options} data={currentData} />
    </>
  );
}
