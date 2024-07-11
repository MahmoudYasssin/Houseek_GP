import IMAGE1 from "./bg-1.jpg";
import IMAGE2 from "./bg-2.jpg";
import IMAGE3 from "./bg-3.jpg";
import IMAGE4 from "./bg-4.jpg";
import IMAGE5 from "./bg-5.jpg";
import IMAGE6 from "./bg-6.jpg";
import LOGO from "./Picture1.jpg";

import { PiWarehouse } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Appcontext } from "../App";
import { toast } from 'react-hot-toast'; // Import toast
import "./home.css";
import SearchBar from "./SearchBar";
import UserMenu from "../Add Property/UserMenu/user";

// Define the saveSettings function
const saveSettings = async (settings) => {
  // Implement saveSettings logic here
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

export const Landing = () => {
  const { setissearch, setSearchResult, signin, signup, setsignup, setsignin } =
    useContext(Appcontext);

  const [location, setAddress] = useState("");
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [isburger, setIsburger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  const imgarray = [IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, IMAGE6];
  const [animation, setAnimation] = useState(imgarray[5]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let radnum = Math.floor(Math.random() * imgarray.length);
      setAnimation(imgarray[radnum]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Define the settings object
  const settings = {}; 

  return (
    <>
      <div className="w-full h-[100vh] relative">
        {/* header */}
        <header
          className={`${
            !isSticky && "absolute w-full top-7 left-0 bg-opacity-50 hover:bg-opacity-90 bg-white text-black"
          } z-50 w-full flex items-center justify-between p-3 transition-all duration-1000 ${
            isSticky &&
            "fixed text-black opacity-50 top-5 w-[80%]  bg-white rounded-xl shadow-xl animate-fade-down animate-duration-700 animate-ease-in"
          }`}
        >
          <div className="flex items-center gap-2">
            <img className="max-w-14 max-h-14 rounded-full" src={LOGO}/>
            <h1 className="text-xl font-bold">Houseek</h1>
          </div>
          <div className="hidden sm:block capitalize">
            <ul className="flex items-center gap-5 text-lg text-center">
              <li className="text-teal cursor-pointer transition-all duration-500">
                Home
              </li>
              <li onClick={() => navigate("/add")} className="hover:text-teal cursor-pointer transition-all duration-500">
                sell
              </li>
              {sessionStorage.getItem("role") === "ADMIN" && (
                <li onClick={() => navigate("/dash")} className="hover:text-teal cursor-pointer transition-all duration-500">
                  dashboard
                </li>
              )}  
              {sessionStorage.getItem("username") && (
                <li
                  onClick={() => navigate("/setting")}
                  className="hover:text-teal cursor-pointer transition-all duration-500"
                >
                  My Apartments
                </li>
              )}
              { sessionStorage.getItem("username") &&
              <li onClick={() => navigate("/profile")} className="hover:text-teal cursor-pointer transition-all duration-500">
                setting
              </li>}
            </ul>
          </div>

          <section className="block sm:hidden relative capitalize">
            <RxHamburgerMenu
              onClick={() => setIsburger(!isburger)}
              size={30}
              className="hover:text-teal cursor-pointer transition-all duration-500"
            />
            {isburger && (
              <div className="absolute top-10 -right-32 w-[300px] shadow-lg">
                <ul className="capitalize flex flex-col items-center gap-4 text-lg bg-white rounded-xl w-full p-4 text-black">
                  <li className="text-teal cursor-pointer transition-all duration-500 border-gray-300 border-b-2 w-full text-center pb-2">
                    Home
                  </li>
                  <li
                    onClick={() => navigate("/add")}
                    className="hover:text-teal cursor-pointer transition-all duration-500 border-gray-300 border-b-2 w-full text-center pb-2"
                  >
                    sell
                  </li>

                  {sessionStorage.getItem("username") && (
                    <li
                      onClick={() => navigate("/setting")}
                      className="hover:text-teal cursor-pointer transition-all duration-500 border-gray-300 border-b-2 w-full text-center pb-2"
                    >
                      My Apartment
                    </li>
                  )}

                  {sessionStorage.getItem("role") === "ADMIN" && (
                    <li
                      onClick={() => navigate("/dash")}
                      className="hover:text-teal cursor-pointer transition-all duration-500 border-gray-300 border-b-2 w-full text-center pb-2"
                    >
                      dashboard
                    </li>
                  )}

                  <li className="hover:text-teal cursor-pointer transition-all duration-500">
                    profile
                  </li>
                </ul>
              </div>
            )}
          </section>

          {!sessionStorage.getItem("username") ? (
            <section className="flex gap-2 text-xl">
              <p
                id="Sign-up"
                onClick={() => {
                  setsignup(!signup);
                }}
                className="hover:text-teal cursor-pointer transition-all duration-500"
              >
                Sign Up
              </p>
              <span>/</span>
              <p
                id="Sign-in"
                onClick={() => {
                  setsignin(!signin);
                }}
                className="hover:text-teal cursor-pointer transition-all duration-500"
              >
                Login
              </p>
            </section>
          ) : (
            <section className="flex gap-2 text-xl items-center cursor-pointer">
              <UserMenu />
              {!sessionStorage.getItem("username") && <div className="flex gap-2 text-xl items-center hover:text-red-600 cursor-pointer transition-all duration-500">
                <p
                  onClick={() => {
                    sessionStorage.clear();
                    toast.promise(
                      saveSettings(settings),
                      {
                        // loading: 'Waiting...',
                        success: <b>You Logged Out!</b>,
                        error: <b>Logout Failed!</b>,
                      }
                    );
                  }}
                  className=""
                >
                  Log out
                </p>
                <span><TbLogout size={30} /></span>
              </div>}
            </section>
          )}
        </header>

        {/* background */}
        <div
          className="relative top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-[2s]"
          style={{ backgroundImage: `url(${animation})` }}
        >
          <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};
