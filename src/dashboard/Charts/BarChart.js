import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Axios from "axios";

export default function BarChart() {
  const [options, setOptions] = useState({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [
        "Cairo",
        "Alexandria",
        "Giza",
        "Shubra El Kheima",
        "Port Said",
        "Suez",
        "Luxor",
        "Asyut",
        "Mansoura",
        "Tanta",
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: "Cities",
      align: "center",
      floating: true,
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  });

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8070/apartment/sell/numOfAparmtmentInCity",
        {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const Data = response.data;
      const Cairo = Data[0];
      const Alexandria = Data[1];
      const Giza = Data[2];
      const Shubra = Data[3];
      const PortSaid = Data[4];
      const Suez = Data[5];
      const Luxor = Data[6];
      const Asyut = Data[7];
      const Mansoura = Data[8];
      const Tanta = Data[9];

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            data: [Cairo, Alexandria, Giza, Shubra, PortSaid, Suez, Luxor, Asyut, Mansoura, Tanta],
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="BarChart">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={options.series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
}
