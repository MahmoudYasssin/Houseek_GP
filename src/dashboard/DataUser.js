import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { LiaBedSolid } from "react-icons/lia";
import { MdOutlineBathtub } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import "./userdata.css";

import { Navigation, Pagination, Scrollbar, A11y, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

import "./style.css";

function DataUser({ user }) {
  
  return (
    <div>
      <div className="user-info">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
          spaceBetween={50}
          // slidesPerView={3}
          //   scrollbar={{ draggable: true }}
          navigation
          zoom={true}
          pagination={{ dynamicBullets: true, clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {Array.isArray(user.images) &&
            user.images.map((image) => (
              <SwiperSlide>
                <div className="swiper-zoom-container">
                  <img src={image.imageUrl} alt="Gallery Image 1" />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="info grid grid-cols-1 gap-y-20 ">
          <div className="paragraphs ">
            <h2 className="title gap-4">{user.title}</h2>
            <h4 className="price gap-4">
              {user.price} <span>$</span>
            </h4>
            <p className="location grid grid-cols-2  items-center w-10">
              <FaLocationDot className="ICON " />  
             {user.location}
            </p>
            <p className="description">{user.description}</p>
          </div>
          <div className="home-info">
            <div className="home">
              <div>
                <LiaBedSolid className="ICON" />
              </div>
              <p>{user.bedrooms}</p>
            </div>
            <div className="home">
              <div>
                <MdOutlineBathtub className="ICON" />
              </div>
              <p>{user.bathrooms}</p>
            </div>
            <div className="home">
              <SlSizeFullscreen className="ICON" />
              <p>
                {user.area} <span>sqft</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataUser;
