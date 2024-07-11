import React from "react"
import { Header } from "../Add Property/Header"
import { Leftside } from "../Add Property/Leftside"
import RealEstateDetails from "./RealEstateDetails"
function Partment() {
  return (
    <div>
      <div style={{ paddingTop: "6px" }}></div>
      <br></br>
      <Header />
      <Leftside />
      <RealEstateDetails />
    </div>
  )
}

export default Partment


