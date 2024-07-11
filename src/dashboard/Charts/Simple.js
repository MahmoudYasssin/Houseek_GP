import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Axios from "axios";
import useAuth from "../../custom-hook/useAuth";

export default function Wow() {
  
  const {DonuatOptions}=useAuth

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
    labels: ["Rejected", "Accepted", "Pending"],
  });

  

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8070/apartment/sell/numbersOfStatus",
        {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const Data = response.data;
      const acceptedItem = Data[0];
      const rejectedItem = Data[1];
      const pendingItem = Data[2];

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [pendingItem, acceptedItem, rejectedItem],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
 
  // Donat FETCH

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

