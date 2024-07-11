import IMAGE1 from './bg-1.jpg';
import IMAGE2 from './bg-2.jpg';
import IMAGE3 from './bg-3.jpg';
import IMAGE4 from './bg-4.jpg';
import IMAGE5 from './bg-5.jpg';
import IMAGE6 from './bg-6.jpg';

import { FaPhoneAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export const Footer=()=>{
    return(   
      <div class="footer bg-gray-800 p-5 mt-24 flex items-center gap-5">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10">
        <div class="box flex items-center flex-col">
          <ul class="social flex items-center space-x-2">
            <li>
              <a
                href="#"
                class="facebook bg-gray-800 text-gray-400 w-12 h-12 flex items-center justify-center text-xl rounded-md transition duration-300 hover:bg-blue-600"
              >
                <FaFacebookSquare />
              </a>
            </li>
            <li>
              <a
                href="#"
                class="twitter bg-gray-800 text-gray-400 w-12 h-12 flex items-center justify-center text-xl rounded-md transition duration-300 hover:bg-blue-400"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="#"
                class="youtube bg-gray-800 text-gray-400 w-12 h-12 flex items-center justify-center text-xl rounded-md transition duration-300 hover:bg-red-600"
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
          <p class="text text-gray-400 mt-5 leading-loose ml-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div class="box">
          <ul class="links">
            <li class=" flex items-center border-b border-gray-600 py-3 hover:pl-2 transition-all duration-300">
              {/* <MdKeyboardDoubleArrowRight className="text-teal-500 text-2xl mr-2" /> */}
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-all duration-300"
              >
                Email 1
              </a>
            </li>
            <li class="border-b flex items-center border-gray-600 py-3 hover:pl-2 transition-all duration-300">
              {/* <MdKeyboardDoubleArrowRight className="text-teal-500 text-2xl mr-2" /> */}
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-all duration-300"
              >
                Email 2
              </a>
            </li>
            <li class="flex items-center border-b border-gray-600 py-3 hover:pl-2 transition-all duration-300">
              {/* <MdKeyboardDoubleArrowRight className="text-teal-500 text-2xl mr-2" /> */}
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-all duration-300"
              >
                Email 3
              </a>
            </li>
          </ul>
        </div>
        <div class="box">
          <div class="line flex items-center text-gray-400 mt-5">
            <FaLocationDot className="text-teal-500 text-2xl mr-2" />
            <div class="info bg-gray-800">
              Egypt, Giza, Inside The Sphinx, Room Number 220
            </div>
          </div>
          <div class="line flex items-center bg-gray-800 text-gray-400 mt-5">
            <FaRegClock className=" text-teal-500 text-2xl mr-2" />
            <div class="info bg-gray-800">Business Hours: From 10:00 To 18:00</div>
          </div>
          <div class="line flex items-center text-gray-400 mt-5">
            <FaPhoneAlt className=" text-teal-500 text-2xl mr-2" />
            <div class="info bg-gray-800">
              <span>+201141971413</span>
            </div>
          </div>
        </div>
        <div class="box footer-gallery flex flex-wrap">
          <img
            src={IMAGE1}
            alt=""
            class="w-20 border-2 border-white m-2 mt-5"
          />
          <img
            src={IMAGE2}
            alt=""
            class="w-20 border-2 border-white m-2 mt-5"
          />
          <img
            src={IMAGE3}
            alt=""
            class="w-20 border-2 border-white m-2 mt-5"
          />
          <img
            src={IMAGE4}
            alt=""
            class="w-20 border-2 border-white m-2 mt-5"
          />
          <img
            src={IMAGE5}
            alt=""
            class="w-20 border-2 border-white m-2 mt-5"
          />
          <img
            src={IMAGE6}
            alt=""
            class="w-20 border-2 border-white m-2 mt-5"
          />
        </div>
      </div>
    </div>
  )
}