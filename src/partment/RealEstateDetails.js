import React, { useState, useEffect } from "react"
import "./part.css"
import { FaLocationDot } from "react-icons/fa6"
import { LiaBedSolid } from "react-icons/lia"
import { MdOutlineBathtub } from "react-icons/md"
import { SlSizeFullscreen } from "react-icons/sl"
import { FaEye } from "react-icons/fa"
import useAuth from "../custom-hook/useAuth"
import axios from "../Home/api/axios"
import { toast } from "react-toastify"
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";

const RealEstateDetails = () => {
  const {} = useAuth()
  const [isLiked, setIsLiked] = useState(false)

  const item = JSON.parse(sessionStorage.getItem("select"))

  const [favtimes, setfavtimes] = useState(0)

  //  take the value from end point { number favourite }
  useEffect(() => {
    const timesfavourite = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/apartment/sell/howManyApartmentExistInFav",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            params: {
              apartmentId: item.id,
            },
          }
        )
        setfavtimes(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    setInterval(()=>{
    timesfavourite()

    },1000)
  }, [])

  // send the data add or not favourite
  const handlefavourite = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked)

    if (!isLiked) {
      const formData = new FormData()

      formData.append("userId", sessionStorage.getItem("id"))
      formData.append("apartmentId", item?.id)

      try {
        const response = await axios.post(
          "/apartment/sell/FavouriteList",
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        toast.success("Added To Favourite List", { autoClose: 2000 })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    } else {
      const formData = new FormData()

      // Append files directly without creating objects

      formData.append("userId", sessionStorage.getItem("id"))
      formData.append("apartmentId", item?.id)

      try {
        const response = await axios.post(
          "/apartment/sell/removeFromFavouriteList",
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        toast.warning("Remove From Favourite List", { autoClose: 2000 })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  }

  // Number of Watching
  const [timesonapart, settimesonapart] = useState(0)
  useEffect(() => {
    const wathcing = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/apartment/sell/numOfApartmentViews",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            params: {
              userId: sessionStorage.getItem("id"),
              apartmentId: item.id,
            },
          }
        )
        settimesonapart(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    setInterval(()=>{
    wathcing()
    },1000)
  }, [timesonapart])


  const handleScroll = (direction, index) => {
    const container = document.getElementById(`card-header`)
    const scrollAmount = 805
    container.scrollLeft += direction === "right" ? scrollAmount : -scrollAmount
  }

  
  return (
    <div className="card">
      
      <span
              className="right"
              onClick={() => handleScroll("right")}
            >
              <i className="fa-solid fa-angle-right"></i>
            </span>

      <div className="card-header" id="card-header">
        {item?.images?.map((image, imgIndex) => (
          <img
            key={imgIndex}
            className="image"
            src={image.imageUrl}
            alt={`image-${imgIndex}`}
          />
        ))}
      </div>
      <span style={{left:"47%",}} className="left" onClick={() => handleScroll("left")}>
              <i className="fa-solid fa-angle-left"></i>
            </span>

      <div className="card-details">
        <div>
          <h1 className="ad-title">{item?.title}</h1>
          <h1 className="ad-price">
            <cod>$ </cod>
            {item?.price
              ?.toString()
              ?.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </h1>
          <div className="disc">
            <p className="ad-description">{item?.description}</p>
          </div>
          <div className="foter">
            <div className="Details">
              <FaLocationDot className="ICON" />
              <p>{item?.location}</p>
            </div>
            <div className="informations">
              <div className="Details">
                <div>
                  <LiaBedSolid className="ICON" />
                </div>
                <p>{item?.bedrooms}</p>
              </div>
              <div className="Details">
                <div>
                  <MdOutlineBathtub className="ICON" />
                </div>
                <p> {item?.bedrooms}</p>
              </div>
              <div className="Details">
                <SlSizeFullscreen className="ICON" />
                <p style={{ marginLeft: "13px" }}>
                  {item?.area} <cod> sqft</cod>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "800px",
                }}
              >
                {timesonapart}
                <FaEye style={{ marginLeft: "5px", fontSize: "28px" }} />
              </div>
              <i
                className={`fas fa-heart ${isLiked ? "liked" : ""}`}
                style={{
                  marginLeft: "50px",
                  marginRight: "5px",
                  fontSize: "28px",
                  cursor:"pointer"
                }}
                onClick={handlefavourite}
              ></i>
              {favtimes}
            </div>
          </div>
        </div>
        <div>
          <div className="phone-email">
                <h2 style={{display:"flex",gap:"8px",alignItems:"center"}}>
                <IoLogoWhatsapp size={40} style={{ color:"green"}} />
                  {
                      sessionStorage.getItem("phone")
                    }
                </h2>
                <h2 style={{display:"flex",gap:"8px",alignItems:"center"}}>
                <SiGmail size={40} style={{ color:"red"}}/>
                  {
                      sessionStorage.getItem("email")
                    }
                </h2>
          </div>
          <div className="email">
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealEstateDetails
