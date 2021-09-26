import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ twilioStats }) => {
  const data = {
    labels: twilioStats
      .map((ele) => new Date(ele.date).toLocaleDateString())
      .reverse(),
    datasets: [
      {
        label: "# of SMS Notifications",
        data: twilioStats.map((ele) => ele.sms).reverse(),
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    // maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
