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



function OwnerShip({ user }) {
    return (
        <div>
            
            <div className='user-info owner'>
            <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}

          modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
          spaceBetween={50}
          navigation
          zoom={true}
          pagination={{ dynamicBullets: true, clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
                          {
                            Array.isArray(user.imagesProof) && user.imagesProof.map((image) => (
                                <SwiperSlide>
                                    <div className="swiper-zoom-container">

                                    <img src={image.imageUrl} alt="Gallery Image 1" />
                                    </div>
                                </SwiperSlide>
                                            ))
                             }
          
         
        </Swiper>
                
            </div>
            
        </div>
    );
}

export default OwnerShip;
