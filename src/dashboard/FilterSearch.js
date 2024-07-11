import { useDispatch } from "react-redux";
import "./Table.css";
export const FilterSearch=()=>{
    const dispatch=useDispatch()
    return(
        <div style={{width:"90%",marginLeft:"80px",marginTop:"120px",marginBottom:"40px"}}>
            <div style={{display:"flex" , justifyContent:"space-between",alignItems:"center", }}>
                <select  style={{padding:"5px"}} onChange={(e)=> {dispatch({type:"UPDATE_FILTER",payload:e.target.value});console.log(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                </select>
                <input style={{padding:"5px"}} 
                type="text" placeholder="Search By Name"
                 onChange={(e)=> dispatch({type:"UPDATE_SEARCH",payload:e.target.value})} />
            </div>
        </div>
    )
}