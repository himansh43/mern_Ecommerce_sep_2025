import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [allOrders, setAllOrders] = useState([]);
  const allOrdersForAdmin = async () => {
    const url = `http://localhost:3000/api/v1/ecommerce/orders/allOrders`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setAllOrders(data.orders.reverse());
    const { success, message } = data;
    if (success) {
      toast.success(message);
    }
    console.log("All admin orders are", data.orders);
  };

  const handleStatus = async (e, orderId) => {
    console.log("orderId is", orderId)
    try {
      const status = e.target.value;
      console.log("status and orderId is", status, orderId);
      const url = `http://localhost:3000/api/v1/ecommerce/orders/updateOrderStatus`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, orderId }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("data is", data);
      const { success, message } = data;
      if (success) {
        toast.success(message);
        allOrdersForAdmin();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  useEffect(() => {
    allOrdersForAdmin();
  }, []);
  return (
    <div>
      <h3 className="text-xl font-medium">All Orders</h3>
      <div>
        {allOrders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_0.5fr_2fr_1fr_1fr] md:grid-cols-[0.5fr_0.5fr_2fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-5 justify-start items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <p>{index+1}</p>
            <img src={assets.parcel_icon} alt="parcel-icon" className="w-12"/>
           
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index} className="py-0.5">
                        {item.name} X {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="py-0.5">
                        {item.name} X {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p className="font-bold">Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">${order.amount}</p>
              <select className="p-2 font-semibold border rounded"
                value={order.status}
                onChange={(e) => handleStatus(e, order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
         
        ))}
      </div>
    </div>
  );
};

export default Orders;
