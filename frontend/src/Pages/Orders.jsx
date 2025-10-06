import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useStoreContext } from "../Context/StoreContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const { products, token } = useStoreContext();
  const [orders, setOrders] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const fetchUserOrders = async () => {
    try {
      if (!token) {
        return;
      }
      const url = `${backend_url}/api/v1/ecommerce/orders/userOrders`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setOrders(data.orders);
      const { success, message } = data;
      if (success) {
        let allOrdersItem = [];
        data?.orders?.map((order) => {
          console.log("order is", order);
          order?.items?.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrders(allOrdersItem.reverse());
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [token]);
  return (
    <div className="mt-4 flex flex-col gap-3  w-full h-full m-auto mb-50 ">
      <h2 className="text-xl mt-5">MY ORDERS</h2>

      <div className="flex flex-row flex-wrap sm:flex-col gap-4 ">
        {orders.map((item, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-1 items-start   sm:grid-cols-[0.1fr_1fr_2fr_1fr_1fr] md:grid-cols-[0.1fr_1fr_2fr_1fr_1fr] lg:grid-cols-[0.1fr_1fr_2fr_1fr_1fr] border border-gray-300 shadow-xl gap-3  pl-6 text-sm py-2 cursor-pointer  "
          >
            <p>{index + 1}</p>
            <div className="   flex  items-start">
              <img src={item.image[0]} alt="" className="w-20 " />
            </div>

            {/* product description */}
            <div className="flex flex-col text-[12px]">
              <p className="sm:text-base ">{item.name}</p>
              <div className="flex items-center gap-3 mt-2  text-gray-700">
                <p>${item.price} </p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <div className="flex gap-15">
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="text-gray-400 mt-2">
                  <span className="text-gray-700">Payment Method:</span>
                  {item.paymentMethod}
                </p>
                <p className="text-gray-400 mt-2">
                  <span className="text-gray-700">Payment status:</span>
                  {item.payment === true ? "Paid" : "Not paid"}
                </p>
              </div>
            </div>

            {/* Ready to ship button */}
            <div className="md:w-1/2 flex justify-between items-start">
              <div className="flex justify-center items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
            <div>
              <button
                className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
                onClick={() => fetchUserOrders()}
              >
                TRACK ORDER
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
