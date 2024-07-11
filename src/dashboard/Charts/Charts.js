import { Header } from "../../Add Property/Header"
import { Leftside } from "../../Add Property/Leftside"
import  BarChart from "./BarChart"
import  Wow from "./Simple"
import ChartComponent from "./chart"
import "../../Add Property/css/Add.css"
import { Axios } from "axios"
import { useEffect, useState } from "react"
import { ChartTitle } from "./ChartTitle"

export const Charts=()=>{
    return(
        <>
        <br></br>
        <Header />
        <Leftside />
            <div className="dashdosh" style={{paddingTop:"120px"}}>
            <div className="chart-item">
            <ChartComponent />
            </div>
            <div className="chart-item">
            <BarChart />
            </div>
            <div className="chart-item">
            <Wow />
            </div>
            <div className="chart-item">
            <ChartTitle  />
            </div>
        </div>
      </>
    )
}