import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function ChartComponent() {
  const [options, setOptions] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Visitors",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
  });

  return (
    <div className="ChartComponent">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}
