import { useRef } from "react";
// import "./css/Add.css"
import { Appcontext } from "../App";
import { useContext,useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaChartPie } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

export const Leftside=()=>{
    const {leftsideRef, is_bigside_Open, setIs_bigside_Open}= useContext(Appcontext)
  const navigate=useNavigate()
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (leftsideRef.current && !leftsideRef.current.contains(event.target) && event.target.id !== 'menu') {
            setIs_bigside_Open(false);
            // console.log("click on i or a")
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return(
        <div className= {is_bigside_Open?'bigleftside':"leftside"}  ref={leftsideRef} >
        <ul className="cursor-pointer">
            {/* <li className="search">
                <a href="#">
                    <span><i className="fa-regular fa-compass"></i></span>
                    <p>search</p>
                </a>
            </li> */}
            <li className="add">
                <a  onClick={()=> navigate("/add")} href="#">
                    <span><i className="fa-solid fa-circle-plus"></i></span>
                    <p>add property</p>  
                </a>
            </li>
            <li className="add">
                <a  onClick={()=> navigate("/setting")} href="#">
                     <CgProfile size={20} />
                    <p>Profile</p>  
                </a>
            </li>
            <li className="add">
                <a  onClick={()=> navigate("/profile")} href="#">
                    <CiSettings size={20} />
                    <p>Setting</p>  
                </a>
            </li>
            {
              sessionStorage.getItem("role") === "ADMIN" &&
                <li className="add">
                    <a onClick={()=> navigate("/dash")} href="">
                        <RxDashboard/>
                        <p>Dash Board</p>  
                    </a>
                </li>
            }
            {
              sessionStorage.getItem("role") === "ADMIN" &&
                <li className="add">
                    <a href="">
                <Link to="/Charts" style={{margin:0,padding:0}}>
                        <FaChartPie/>
                        <p>Statistics</p>  
                </Link>
                    </a>
                </li>
            }
        </ul>
  </div>);
}