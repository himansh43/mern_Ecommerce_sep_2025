import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between items-center w-full mt-10 px-5 ">
      <div className="w-full flex flex-col items-center justify-between">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] mb-10   ">
          <div className="flex flex-col ">
            <img src={assets.logo} alt="company-logo" className="w-24  mb-5" />
            <p className="text-gray-600 w-full md:w-2/3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              quo accusantium nostrum placeat aliquid atque culpa voluptatem
              eius tempore in. Magni blanditiis, beatae magnam nulla adipisci
              rerum dicta sed ad?
            </p>
          </div>
          <div className="py-10 sm:py-0">
            <p className="font-semibold text-2xl  mb-5 text-gray-600">
              COMPANY
            </p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About Us</li>
              </Link>
              <Link to="/contactus">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li className="font-semibold text-2xl  mb-5 text-gray-600">
                GET IN TOUCH
              </li>
              <li>+212-456-7890</li>
              <li>contact@forever.com</li>
            </ul>
          </div>
        </div>
        <hr className="text-gray-200 w-full" />
        <div className="mt-5 mb-10">
          <p className="text-gray-600 text-[14px]">
            ©Copyright 2025@forever.com- All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
