import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import IMAGE1 from "./Xx.jpeg";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target) &&
      showMenu
    ) {
      setShowMenu(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
  };

  // Default image path from the public folder
  const img = sessionStorage.getItem("image") !== "null" ? sessionStorage.getItem("image") : IMAGE1;

  return (
    <div
      className="userMenuContainer"
      onClick={() => setShowMenu(!showMenu)}
      ref={wrapperRef}
      style={{ paddingTop: "8px" }}
    >
      <div
        className="headerUser dropdown-toggle"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid black",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          marginRight: "5px",
        }}
      >
        <img
          className="avatar headerAvatar pull-left"
          src={img}
          style={{
            maxWidth: "45px",
            maxHeight: "45%",
            borderRadius: "50%",
            paddingTop: "1px",
            paddingBottom: "1px",
          }}
          alt="User Avatar"
        />
        <div style={{ padding: "5px" }} className="userTop pull-left">
          <span className="headerUserName">{sessionStorage.getItem("name")}</span>
        </div>
        <i className="fa-solid fa-caret-down" style={{ marginRight: "3px", marginTop: "4px" }}></i>
        <div className="clearfix" />
      </div>
      {showMenu && (
        <div
          className="dropdown-menu pull-right userMenu rounded-xl"
          style={{
            backgroundColor: "white",
            top: "80px",
            right: "10px",
            margin: "0",
            padding: "0",
            width: "200px",
            position: "absolute",
          }}
          role="menu"
        >
          <div
    className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
    role="menu"
  >
    {/*userMenu*/}
    <div className="p-2">
      <a
        href="#"
        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
      >
<Link style={{ margin: "0", padding: "0" }} to="/fav">
                <i style={{ color: "red", marginRight: "15px" }} className="fa-solid fa-heart"></i>
                Favourites
              </Link>      </a>

      <a
        href="#"
        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
      >
 <Link style={{ margin: "0", padding: "0", width: "100%" }} to="/setting">
                <i style={{ marginRight: "10px" }} className="fa-solid fa-user"></i>
                Profile
              </Link>      </a>

      <a
        href="#"
        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
      >
 <Link style={{ margin: "0", padding: "0", width: "100%" }} to="/profile">
                <i style={{ marginRight: "10px" }} className="fa-solid fa-gear"></i>
                Setting
              </Link>      </a>

    
    </div>

    <div className="p-2">
      <form >
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
          role="menuitem"
          onClick={handleLogout}
        >
       

       <a href="#" >
                <i style={{ marginRight: "10px" }} className="fa-solid fa-right-from-bracket"></i>
                Logout
              </a>
        </button>
      </form>
    </div>
    </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
