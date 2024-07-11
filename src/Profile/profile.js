import React from "react"
import { Header } from "../Add Property/Header"
import { Leftside } from "../Add Property/Leftside"
import { FaLocationDot } from "react-icons/fa6"
import { LiaBedSolid } from "react-icons/lia"
import { MdOutlineBathtub } from "react-icons/md"
import { SlSizeFullscreen } from "react-icons/sl"
import { useState, useEffect } from "react"
import "../Home/home.css"
import axios from "../Home/api/axios"

import { Navigation, Pagination, Scrollbar, A11y, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

import "./style.css";
import { useNavigate } from "react-router-dom"


function Sitting() {
  const navigate=useNavigate()
  const [profiledata, setprofiledata] = useState([])
 
  useEffect(() => {
    const ProfileList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/userApartments",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            params: {
              userId: sessionStorage.getItem("id"),
            },
          }
        )
        setprofiledata(response.data.reverse())
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    ProfileList()
  }, [])

  const handleItemClick = (item,e) => {
    
    sessionStorage.setItem("select",JSON.stringify(item))

    console.log("Clicked element tag name:", e.target.tagName);
    if (e && e.target && e.target.tagName !== "I" && e.target.tagName !== "DIV") {
      navigate("/part");
    }
  };

  return (
    <div>
      <div style={{ paddingTop: "7px" }}></div>
      <br></br>
      <Header />
      <Leftside />
      <div>
        <div className="mt-24 mx-auto w-[80%] ">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 rounded ">
            
          {profiledata.map((item, index) => (
              item.status==="Accepted" &&
               <div onClick={(e) => handleItemClick(item,e)}className=" relative max-w-[390px] max-h-[355px] shadow-2xl group rounded-xl hover:scale-110 transition-all duration-700  ">
              <div className="relative overflow-hidden max-h-[220px] min-h-[220px] max-w-full flex items-center">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  // install Swiper modules
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={50}
                  navigation
                  pagination={{ dynamicBullets: true, clickable: true }}
                >
                  {Array.isArray(item.images) &&
            item.images.map((image) => (
              <SwiperSlide>
                <div className="swiper-zoom-container max-h-[220px] min-h-[220px]">
                  <img src={image.imageUrl} alt="Gallery Image 1 max-h-[220px] min-h-[220px]" />
                </div>
              </SwiperSlide>
            ))}
                </Swiper>
                <p className="absolute -bottom-5 group-hover:bottom-2 left-2 z-50 text-white transition-all duration-[1s]">
                  <cod>$ </cod> {item?.price?.toString()?.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <cod> $</cod>
                </p>
              </div>
              <p className="z-20 absolute top-3 left-3 bg-yellow-500 text-white p-2 rounded-xl ">
              {item.propertyType}
              </p>
              <section className="p-2">
                <div className="text">
                  <h3 className="text-2xl font-semibold mb-3"> {item.title}</h3>
                  <div className="flex gap-1 items-center">
                    <div>
                      <FaLocationDot className="ICON" size={25} />
                    </div>
                    <p className="text-xl ">{item.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <LiaBedSolid className="ICON" size={25} />
                    </div>
                    <p className="text-lg font-medium">{item.bedrooms}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <MdOutlineBathtub className="ICON" size={25} />
                    </div>
                    <p className="text-lg font-medium"> {item.bathrooms} </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <SlSizeFullscreen className="ICON" size={25} />
                    <p className="text-lg font-medium">
                    {item.area} <cod> sqft</cod>
                    </p>
                  </div>
                </div>
              </section>
            </div>))}
    </div>
    </div>
    </div>
    </div>
  )
}

export default Sitting
