import React, { useEffect, useState } from "react";
import { useStoreContext } from "../Context/StoreContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
const Cart = () => {
  const {
    cartData,
    products,
    updateQuantity,
    getCartAmount,
    setCartData,
    delivery_fee,
    token,
    getUserCart
  } = useStoreContext();
  const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartData) {
        for (const size in cartData[items]) {
          if (cartData[items][size] > 0) {
            tempData.push({
              _id: items,
              size: size,
              quantity: cartData[items][size],
            });
          }
        }
      }
      setCartItems(tempData);
    }
  }, [cartData]);
  return (
    <div className="flex w-full mt-8">
      {
        Object.keys(cartData).length === 0?<div className="w-full  flex justify-center mb-70"><p className="text-2xl font-medium text-gray-700">Your Cart is Empty!!!</p></div>:      <div className="flex flex-col w-full gap-3">
        <p className=" mb-5 text-2xl font-sm text-gray-500">
          Your <span className="font-medium text-gray-700">Cart</span>
        </p>
        <div className="flex flex-col gap-2">
          {cartItems.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={index}
                className="grid  grid-cols-[1fr_3fr_1fr_1fr] border border-gray-300 items-center px-3 py-1"
              >
                <img
                  src={productData.image[0]}
                  alt="image"
                  className="w-12 ml-4"
                />
                <div className="flex flex-col">
                  <p>{productData.name}</p>
                  <div className="flex gap-5">
                    <p>${productData.price}</p>
                    <p className="px-3 py-1 bg-gray-300">{item.size}</p>
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    className="border w-20 border-gray-500 rounded-sm  text-center"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  >
                    <FaRegTrashCan className="cursor-pointer"/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-center items-end mt-10 mb-15 w-full">
          <div className="flex flex-col  justify-center w-96">
            <p className=" text-2xl font-sm text-gray-500 mb-5">
              CART <span className="font-medium text-gray-700">TOTALS</span>
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${getCartAmount()}</p>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>${getCartAmount() === 0 ? 0 : delivery_fee}.00</p>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between">
                <p>Total</p>
                <p>
                  ${getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
                </p>
              </div>
              <hr className="text-gray-300" />
              <NavLink to="/placeorder">
                <div className="mt-5">
                  <button className="bg-black px-5 py-1 text-white cursor-pointer">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Cart;
