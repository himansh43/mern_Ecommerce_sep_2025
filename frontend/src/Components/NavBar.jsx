import React, { useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context/StoreContext";
import { useState } from "react";
import { toast } from "react-toastify";
const NavBar = () => {
  const { showSearch, setShowSearch,getCartCount ,cartData,setCartData} = useStoreContext();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { token, setToken,userName,setUserName } = useStoreContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken("");
    setCartData({})
    localStorage.removeItem("E-commerce-Token");
     localStorage.removeItem('user-name')
     setUserName("")
     toast.success("Logout successfull")
    navigate('/')  
  };
  
  return (
    <div className="flex flex-col justify-center items-center w-full mt-5  py-1 border-b border-b-gray-300">
      <div className="flex justify-between items-center w-full">
        <div>
          <NavLink to="/">
            <img src={assets.logo} alt="logo" className="w-30" />
          </NavLink>
        </div>
        <div>
          <ul className="hidden sm:flex gap-5 text-gray-700">
            <NavLink to="/home">
              <li>HOME</li>
              <hr className="hidden" />
            </NavLink>
            <NavLink to="/collections">
              <li>COLLECTIONS</li>
              <hr className="hidden" />
            </NavLink>
            <NavLink to="/about">
              <li>ABOUT US</li>
              <hr className="hidden" />
            </NavLink>
            <NavLink to="/contactus">
              <li>CONTACT US</li>
              <hr className="hidden" />
            </NavLink>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-4">
          {location.pathname === "/collections" && (
            <img
              src={assets.search_icon}
              alt="search-icon"
              className="w-5 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
          )}
          <div className="group relative cursor-pointer">
            <img
              src={assets.profile_icon}
              alt="profile-icon"
              className="w-5"
              onClick={() => (token ? null : navigate("/login"))}
            />
            
            <div className="group-hover:block hidden absolute dropdown-menu right-0 top-4 pt-4">
              {token ? (
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Orders</p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>

                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Link to="/cart">
            <div className="relative ">
              <img
                src={assets.cart_icon}
                alt="cart-icon"
                className="w-5 cursor-pointer"
              />
              <p className="absolute rounded-full border bg-black text-white top-3 left-2 w-6 text-center text-[15px]">
                {getCartCount()===0?"":getCartCount()}
              </p>
            </div>
          </Link>
          <p className="text-xl  text-gray-700 ">{userName}</p>
         

          {/* Mobile menu items */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt="menu-icon"
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
        {/* SideBarMenu for small screens */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              className="flex items-center gap-4 p-3 cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <img
                src={assets.dropdown_icon}
                alt=""
                className="h-4 rotate-180"
              />
              <p>Back</p>
            </div>
            <NavLink
              to="/"
              className="py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/collections"
              className="py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              COLLECTIONS
            </NavLink>
            <NavLink
              to="/about"
              className="py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="/contactus"
              className="py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              CONTACT US
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
