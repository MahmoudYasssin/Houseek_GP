import "../Add Property/css/Add.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FilterSearch } from "./FilterSearch"
import { Header } from "../Add Property/Header"
import { Leftside } from "../Add Property/Leftside"
import TableWithButtons from "./TableWithButtons" 
import axios from "../Home/api/axios"


function Dash() {
  const tableData = useSelector((state) => state?.data)
  console.log("table data: ", tableData)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("/apartment/sell/selectAllForDash", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        // console.log("token in home all ", token)
        dispatch({ type: "SAVE_ALL", payload: response.data.reverse() })
        console.log("the data of the table:", tableData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchdata()
  }, [tableData])
  return (
    <div>
      <div style={{ paddingTop: "6px" }}></div>
      <br></br>
      <Header />
      <Leftside />
      <FilterSearch />
      <TableWithButtons />
    </div>
  )
}

export default Dash
