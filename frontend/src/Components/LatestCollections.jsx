import React, { useEffect, useState } from "react";
import { useStoreContext } from "../Context/StoreContext";
import { NavLink } from "react-router-dom";

const LatestCollections = () => {
  const { products } = useStoreContext();
  const latestCollections = products.slice(0, 10);
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full mt-20">
      <div className="flex items-center gap-2">
        <h3 className="font-mono text-2xl">LATEST COLLECTIONS</h3>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
      </div>

      <p className="text-sm text-gray-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
        similique molestiae, nam rem labore voluptate provident repudiandae.
      </p>
      <div className="grid grid-cols-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full ">
        {latestCollections?.map((item, index) => (
          <div key={item._id}>
            <NavLink to={`/product/${item._id}`}>
              <div className=" flex flex-col  px-5 py-5">
                <div className="overflow-hidden">
                  <img
                    src={item.image[0]}
                    alt="product-image"
                    className="w-full cursor-pointer hover:scale-110 transition ease-in-out"
                  />
                </div>
                <p className="text-[12px] text-gray-400 mt-2 mb-2">
                  {item.name}
                </p>
                <p>${item.price}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
