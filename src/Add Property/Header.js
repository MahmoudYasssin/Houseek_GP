import { Form, Link } from "react-router-dom"
import { Appcontext } from "../App"
import { useContext, useEffect, useState } from "react"
import UserMenu from "./UserMenu/user"
import Axios from "axios"
import { toHaveAttribute } from "@testing-library/jest-dom/matchers"
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { is_bigside_Open, setIs_bigside_Open,paydetail,setpaydetail } = useContext(Appcontext)
  const [noitify,setNotification]=useState([])
  const [NewNoitify,setnew]=useState([])
  const [openNotify,setopenNotify]=useState(false)
  const navigate = useNavigate();


  const toggleleftside = () => {
    setIs_bigside_Open(!is_bigside_Open)
  }

  const notification = async () => {
    try {
      const response = await Axios.get("http://localhost:8070/dashboard/showMessages", {
        
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          'Content-Type': 'application/json',
      },
        params: {
          userName: sessionStorage.getItem("username"),
        },
    });

    setNotification(response.data.reverse())

    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  
  
  const handlePayment = (user) => {

    setpaydetail(user)
    sessionStorage.setItem("PayId",user.apartmentId)
    console.log("detail of payment",user)
    if(!user.isPaid)
      {navigate('/payment');}
  };

  const hanleNotification= async()=>{
    const userName=sessionStorage.getItem("username")
    try {
      const response = await Axios.post(`http://localhost:8070/dashboard/editMessageStatus?userName=${userName}`,{}, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
       
    });

    setopenNotify(!openNotify)
    setnew([])

    } catch (error) {
      console.error("Error fetching data:", error)
    }

  }
  console.log(sessionStorage.getItem("username"))

  async function tripleNotify() {
    try {
        const [data1, data2] = await Promise.all([
            fetch(`http://localhost:8070/dashboard/showWhoAddMyApartmentToFavList?userName=${sessionStorage.getItem("username")}`),
            fetch(`http://localhost:8070/dashboard/showWhoViewMyApartment?userName=${sessionStorage.getItem("username")}`),
        ]);

        const responseData1 = await data1.json();
        const responseData2 = await data2.json();
         responseData1.reverse(); 
         responseData2.reverse();
        
        setNotification(prev => [...prev,...responseData1,...responseData2])
        

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

useEffect(() => {
    tripleNotify()
  notification()
}, [])


  
  useEffect(() => {
    const filteredNotifications = noitify?.filter(user => !user.isRead);
    setnew(filteredNotifications);
    

    console.log("New One :" ,NewNoitify)
    console.log("NOTIFICATION :" ,noitify)
    console.log("true or false? :" ,openNotify)
    
  }, [noitify]);
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <a>
              <span>
                <i className="fa-sharp fa-solid fa-house-chimney"></i>
              </span>
              
            </a>
          </Link>

        </div>
        <div className="menu" onClick={toggleleftside}>
          <a id="menu">
            <span>
              <i id="menu" className="fa-solid fa-bars"></i>
            </span>
          </a>
        </div>
        <div className="search">
          <span className="icon">
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          </span>
          <div className="search-input">
            <input type="text" placeholder="Search for houses, apartment..." />
          </div>
        </div>
        <div className="notify">
          <a 
          onClick={hanleNotification}
          >
            <span>
              <i className="fa-solid fa-bell">
               { NewNoitify.length!==0 && <span className="length">{NewNoitify.length}</span>}
              </i>
            </span>
          </a>
            { openNotify &&

            <div className="drop-down">
              {
                  noitify?.map((user)=>{
                    console.log(user.isRead)
                  return (
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px"}}>
                      
                      <p style={{ fontWeight: user.isRead ? 'bold' : '' , color: user.isRead ? '#999' : 'black' }}>  {user.message} {user.isAccepted && "Pay to Advertise"} </p>
                      {user.isAccepted ==="Accepted" && <button className="xxv" onClick={()=> handlePayment(user)}style={{backgroundColor:"gray",marginTop:"4px" }}> 
                       { user.isPaid ? "Done" : "Pay Here"}
                         </button>}
                    </div>
                  )

                })
              }

            </div>}
        </div>

        <UserMenu />
      </nav>
    </header>
  )
}


