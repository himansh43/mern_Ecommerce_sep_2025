import React, { useState } from "react";
import { assets, products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context/StoreContext";
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const backend_url= import.meta.env.VITE_BACKEND_URL
  const {
    delivery_fee,
    getCartAmount,
    token,
    cartData,
    setCartData,
    products,
  } = useStoreContext();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
  });
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const {amount,currency,id,receipt}= order
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id:order.id,
      receipt:receipt,
      handler: async (response) => {
        try {
          const url = `${backend_url}/api/v1/ecommerce/orders/verifyRazorPay`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({response} ),
          };
          const responseData = await fetch(url, options);
          const data = await responseData.json();
          const { success, message } = data;
          if (success) {
            navigate("/orders");
            setCartData({});
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartData) {
        for (const item in cartData[items]) {
          if (cartData[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartData[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      switch (method) {
        case "cod":
          const codUrl = `${backend_url}/api/v1/ecommerce/orders`;
          const codOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              items: orderItems,
              amount: getCartAmount() + delivery_fee,
              address: inputs,
            }),
          };
          const codResponse = await fetch(codUrl, codOptions);
          const codData = await codResponse.json();
          var { success, message } = codData;
          if (success) {
            navigate("/orders");
            setCartData({});
            toast.success(message);
            setInputs({
              firstName: "",
              lastName: "",
              email: "",
              street: "",
              city: "",
              state: "",
              country: "",
              zipCode: "",
              phone: "",
            });
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const stripeUrl = `${backend_url}/api/v1/ecommerce/orders/stripe`;
          const stripeOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              items: orderItems,
              amount: getCartAmount() + delivery_fee,
              address: inputs,
            }),
          };
          const stripeResponse = await fetch(stripeUrl, stripeOptions);
          const stripeData = await stripeResponse.json();
          var { success, message } = stripeData;
          if (success) {
            const { session_url } = stripeData;
            window.location.replace(session_url);       
            setCartData({});
            toast.success(message);
            setInputs({
              firstName: "",
              lastName: "",
              email: "",
              street: "",
              city: "",
              state: "",
              country: "",
              zipCode: "",
              phone: "",
            });
          } else {
            toast.error(stripeData.message);
          }
          break;
        case "razorpay":
          const razorPayURl = `${backend_url}/api/v1/ecommerce/orders/razorpay`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              items: orderItems,
              amount: getCartAmount() + delivery_fee,
              address: inputs,
            }),
          };
          const razorPayResponse = await fetch(razorPayURl, options);
          const razorPayData = await razorPayResponse.json();
          if (razorPayData.order) {
            initPay(razorPayData.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  return (
    <div className="flex justify-center items-center w-full mt-10   mb-25">
      <form
        className="w-full flex flex-col sm:flex-row gap-10 sm:gap-0  justify-between  items-center "
        onSubmit={handleSubmit}
      >
        {/* Left side */}
        <div className="flex flex-col w-full sm:w-[45%] gap-5">
          <h2 className="text-2xl text-gray-600 font-medium">
            DELIVERY INFORMATION
          </h2>
          <div className="flex gap-5">
            <input
              required
              type="text"
              placeholder="Firstname"
              className="px-3 py-2 border border-gray-400 outline-0 w-full "
              onChange={handleInputs}
              name="firstName"
              value={inputs.firstName}
            />
            <input
              required
              type="text"
              placeholder="Lastname"
              className="px-3 py-2 border border-gray-400 outline-0 w-full"
              onChange={handleInputs}
              name="lastName"
              value={inputs.lastName}
            />
          </div>
          <input
            required
            type="email"
            placeholder="Email Address"
            className="px-3 py-2 border border-gray-400 outline-0 w-full"
            onChange={handleInputs}
            name="email"
            value={inputs.email}
          />
          <input
            required
            type="text"
            placeholder="Street"
            className="px-3 py-2 border border-gray-400 outline-0 w-full"
            onChange={handleInputs}
            name="street"
            value={inputs.street}
          />
          <div className="flex gap-5">
            <input
              required
              type="text"
              placeholder="City"
              className="px-3 py-2 border border-gray-400 outline-0 w-full"
              onChange={handleInputs}
              name="city"
              value={inputs.city}
            />
            <input
              required
              type="text"
              placeholder="State"
              className="px-3 py-2 border border-gray-400 outline-0 w-full"
              onChange={handleInputs}
              name="state"
              value={inputs.state}
            />
          </div>
          <div className="flex gap-5">
            <input
              required
              type="number"
              placeholder="Zipcode"
              className="px-3 py-2 border border-gray-400 outline-0 w-full"
              onChange={handleInputs}
              name="zipCode"
              value={inputs.zipCode}
            />
            <input
              required
              type="text"
              placeholder="Country"
              className="px-3 py-2 border border-gray-400 outline-0 w-full"
              onChange={handleInputs}
              name="country"
              value={inputs.country}
            />
          </div>
          <input
            required
            type="number"
            placeholder="Phone"
            className="px-3 py-2 border border-gray-400 outline-0 w-full"
            onChange={handleInputs}
            name="phone"
            value={inputs.phone}
          />
        </div>

        {/* Right side */}
        <div className="flex flex-col w-full sm:w-[40%] gap-20  px-3">
          <div className="flex flex-col gap-3 w-full">
            <h2 className="text-2xl text-gray-600 font-medium">CART TOTALS</h2>
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p>${getCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p>Shipping Fee</p>
              <p>${getCartAmount() === 0 ? 0 : delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p className="font-bold">Total</p>
              <p className="font-bold">
                ${getCartAmount === 0 ? 0 : getCartAmount() + delivery_fee}
              </p>
            </div>
          </div>
          <div className="w-full">
            <h2 className="font-medium text-xl mb-2">PAYMENT METHOD</h2>
            <div className="grid  gap-1 grid-cols-1 lg:grid-cols-[1.3fr_1.6fr_2fr]">
              <div
                onClick={() => setMethod("stripe")}
                className="w-full h-10 border border-gray-200 flex  items-center gap-1 px-3 cursor-pointer"
              >
                <p
                  className={`rounded-full h-2 w-2 ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img
                  src={assets.stripe_logo}
                  alt="stripe-logo"
                  className="w-15 "
                />
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className="border border-gray-200 flex items-center gap-1 px-3 w-full h-10 cursor-pointer"
              >
                <p
                  className={`rounded-full h-2 w-2 ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img
                  src={assets.razorpay_logo}
                  alt="razorpay-logo"
                  className="w-25"
                />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className=" border border-gray-200 flex  items-center gap-1 px-3 h-10 w-full cursor-pointer"
              >
                <p
                  className={`rounded-full h-2 w-2 ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="w-full text-sm">CASH ON DELIVERY</p>
              </div>
            </div>

            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className="bg-black text-white w-full px-3 py-2 cursor-pointer mt-3"
            >
              PLACEORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
