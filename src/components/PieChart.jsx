import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  // plugins: {
  //   legend: {
  //     position: "top",
  //   },
  //   title: {
  //     display: true,
  //     text: "allocation evolution over time",
  //   },
  // },
  maintainAspectRatio: false,
};

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "allocation %",
      data: [30, 20, 50],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return <Pie options={options} data={data} />;
}
