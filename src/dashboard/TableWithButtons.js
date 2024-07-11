// TableWithButtons.js

import React, { useEffect, useRef, useState } from "react";
import "./Table.css";
import useAuth from "../custom-hook/useAuth";
import DataUser from "./DataUser";
import OwnerShip from "./OwnerShip";
import axios from "../Home/api/axios";
import { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";

const TableWithButtons = () => {

  const filteredUsers = useSelector((state) => {
    const users = state?.data;
    const filter = state?.filter;
    const searchTerm = state?.search?.toLowerCase(); 

    return users?.filter((user) => {
        const matchesFilter = (filter === 'accepted' && user.status==="accept" ) ||
        (filter === 'rejected' && user.status==="reject") || (filter === 'pending' && user.status==="pending" ) || filter === 'all' 

     const matchesSearch = user?.apartmentOwner?.toLowerCase()?.includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });
  console.log("FILTER",filteredUsers)

  const TableData=useSelector((state)=> state?.data)
  

 


  const [Userdata, setUserdata] = useState([]);
  const [OwnerShipData, setOwnerShipData] = useState([]);
  const [openData, setopenData] = useState(false);
  const [OpenOwnerShip, setOpenOwnerShip] = useState(false);
  const [message,setMessage]=useState("")
  const [AccOrRej,setAccOrRej]=useState("")
  const userdataRef = useRef();
  const OwnerdataRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userdataRef.current &&
        !userdataRef.current.contains(event.target) 
      ) {
        setopenData(false);
      }
      if (
        OwnerdataRef.current &&
        !OwnerdataRef.current.contains(event.target) 
      ) {
        setOpenOwnerShip(false);
      }
      console.log(event.target);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  

  const handleAction = async (type, user) => {
    setAccOrRej(type)
    const formData = new FormData()
    formData.append("newStatus",type )
    formData.append("apartmentId",user.id )
    
    console.log("the data after click the action",formData)
    try {
      const response = await axios.post("/apartment/sell/editApartmentStatus", formData, {
        headers: {
        //  Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error) {
      console.log("API FROM ACTION",error);
    }
  };

  const sendMessage = async (id) => {
    console.log()
    const formData = new FormData()
    formData.append("message",message )
    formData.append("apartmentId",id )
    formData.append("isAccepted",AccOrRej )
    
    console.log("the data after click the action",formData)
    try {
      const response = await axios.post("/dashboard/sendMessage", formData, {
        headers: {
        //  Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
    setMessage("")
    } 
    catch (error) {
      console.log("API FROM SEND THE MESSAGE",error);
    }
  };

  

  const handlesentdata = (user) => {
    setopenData(!openData);
    setUserdata(user);
    console.log(user)
  };
  const handleSentOwner = (user) => {
    setOpenOwnerShip(!OpenOwnerShip);
    setOwnerShipData(user);
  };
  return (
    <div>
      
      <table>
        <thead>
          <tr>
            <th style={{ fontWeight: "bold", textAlign: "center" }}>Name</th>
            <th style={{ fontWeight: "bold", textAlign: "center" }}>Data</th>
            <th style={{ fontWeight: "bold", textAlign: "center" }}>Owner Ship</th>
            <th style={{ fontWeight: "bold", textAlign: "center" }}>Action</th>
            <th style={{ fontWeight: "bold", textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* here i will put data variable hold the all data reject and accept and pending instead of tableData */}
          {/* {tableData.map((user, index) => ( */}
          {filteredUsers?.map((user, index) => ( 
            <tr key={index}>
              <td style={{ fontWeight: "bold", textAlign: "center" }}>{user.apartmentOwner} </td>
              {/*                             here i mean the id of the user  */}
              <td style={{  justifyContent: "center", textAlign: "center" }}>
                <button 
                style={{justifyContent: "center", textAlign: "center",display: "flex",marginLeft:"30%" ,padding:"15px 30px",borderRadius:"10px"}}
                className="open-data"
                  onClick={() => {
                    handlesentdata(user);
                  }}
                >
                  Open Data
                </button>
              </td>
              <td>
              <button 
                style={{justifyContent: "center", textAlign: "center",display: "flex",marginLeft:"30%",padding:"15px 30px",borderRadius:"10px "}} 
                               className="open-data"
                  onClick={() => {
                    handleSentOwner(user);
                  }}
                >
                  Owner Ship
                </button>
              </td>
              {user.status === "pending" ? (
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  <button
                   style={{padding:"15px 30px",borderRadius:"10px"}}
                    className="accept-btn"
                    onClick={() => handleAction("Accepted", user)}
                  >
                    Accept
                  </button>
                  <button
                  style={{padding:"15px 30px",borderRadius:"10px"}}
                    className="reject-btn"
                    onClick={() => handleAction("Rejected", user)}
                  >
                    Reject
                  </button>
                </td>
              ) :(user.status === "Rejected" ) ? (
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  <div className="message">
                    <textarea placeholder="write the message" onChange={(e)=>{setMessage(e.target.value)}} style={{borderRadius:"10px"}}></textarea>
                    <button onClick={()=>{sendMessage(user.id)}} style={{ transform: "rotate(180deg)" }}> <i class="fa-solid fa-reply-all"></i></button>
                  </div>
                </td>
              ): <td></td>}
              <td
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                textAlign:"center",
                  color:
                    user.status === "pending"
                      ? "grey"
                      : user.status === "Accepted"
                      ? "green"
                      : "red",
                }}
              >
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openData && (
        <div className="position-fixed">
          <div className="DATA" ref={userdataRef}>
            <DataUser user={Userdata} />
          </div>
        </div>
      )}
      {OpenOwnerShip && (
        <div className="position-fixed" >
          <div className="DATA" ref={OwnerdataRef}>
            <OwnerShip user={OwnerShipData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableWithButtons;
