import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/AddProduct";
import ListProduct from "./Pages/ListProduct";
import Orders from "./Pages/Orders";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import Login from "./Pages/Login";
import { useState } from "react";
import Error from "./Pages/Error";

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("E-commerce-Admin-Token"))||"");
  useEffect(()=>{
    localStorage.setItem("E-commerce-Admin-Token",JSON.stringify(token))
  },[token])
  return (
    <div className="flex flex-col w-[100%] min-h-screen m-auto">
      {token === "" ? (
        <Login token={token} setToken={setToken}/>
        
      ) : (
        <>
          <NavBar token={token} setToken={setToken}/>
          <div className="flex w-full justify-between mt-10 max-w-[90%] m-auto">
            <div className="w-[30%]">
              <SideBar />
            </div>
            <div className="w-full h-screen px-10">
              <Routes>
                <Route path="/" element={<AddProduct />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/list" element={<ListProduct />} />
                <Route path="/orders" element={<Orders token={token}/>} />
                <Route path="/login" element={<Login />} />
               
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
