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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ graphData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `initial stock prices on: ${graphData[0].investment_date}`,
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
    labels,
    datasets: graphData.map((stock, i) => {
      return {
        label: stock.stock_name,
        data: [stock.price_of_stock, 300],
        borderColor: ["rgb(255, 99, 132)", "rgb(53, 162, 235)"].slice(0, i + 1),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
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
