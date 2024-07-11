import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Axios from "axios";
import useAuth from "../../custom-hook/useAuth";

export const ChartTitle=()=>{

  const [options, setOptions] = useState({
    series: [],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Apartment", "Office", "Villa"],
  });

  const Donuat = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8070/apartment/sell/numOfApartmentTitle",
        {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const Data = response.data;
      console.log("Data with donut chart", Data);
      const apartment = Data[0];
      const vila = Data[1];
      const Office = Data[2];

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [Office, apartment, vila],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    Donuat();
  }, []);


 
  return (
    <div className="Wow">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type="pie"
            width="500"
          />
        </div>
      </div>
    </div>
  );

}