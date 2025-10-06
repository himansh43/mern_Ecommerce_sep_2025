import { createContext, useContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const StoreContext = createContext();
export const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("E-commerce-Token")) || ""
  );
  // console.log("token is ",token)
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [cartData, setCartData] = useState({});
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("user-name")) || ""
  );
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const delivery_fee = 10;

  // Done
  const addToCart = async (productId, productSize) => {
    if (!productSize) {
      toast.error("Select Product size");
      return;
    }
    try {
      if (!token) {
        let cartItem = structuredClone(cartData);
        if (cartItem[productId]) {
          if (cartItem[productId][productSize]) {
            cartItem[productId][productSize] += 1;
          } else {
            cartItem[productId][productSize] = 1;
          }
        } else {
          cartItem[productId] = {};
          cartItem[productId][productSize] = 1;
        }
        setCartData(cartItem);
        toast.success("Product Added");
      }
      if (token) {
        try {
          const url = `${backend_url}/api/v1/ecommerce/carts/addToCart`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ itemId: productId, size: productSize }),
          };
          const response = await fetch(url, options);
          const data = await response.json();
          console.log("Add to Cart Data is ", data);
          setCartData(data.cart);
          const { message, success } = data;
          if (success) {
            toast.success(message);
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const removeFromCart = (productItem, sizes) => {
    try {
      let cartItem = structuredClone(cartData);
      if (cartItem[productItem]) {
        if (cartItem[productItem][sizes] > 0) {
          cartItem[productItem][sizes] -= 1;
        } else {
          cartItem[productItem][sizes] = 1;
        }
      }
    } catch (error) {}
  };

  //Done
  const getUserCart = async () => {
    try {
      const url = `${backend_url}/api/v1/ecommerce/carts/getUserCart`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      const { success, message } = data;
      if (success) {
        setCartData(data.cart);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    getUserCart();
  }, [token]);

  //function to show the number of product's count in users cart
  const getCartCount = () => {
    let totalCount = 0;
    for (let productId in cartData) {
      for (let size in cartData[productId]) {
        try {
          if (cartData[productId][size] > 0) {
            totalCount += cartData[productId][size];
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartItem = structuredClone(cartData);
    cartItem[itemId][size] = quantity;
    setCartData(cartItem);
    if (token) {
      try {
        const url = `${backend_url}/api/v1/ecommerce/carts/updateCart`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itemId: itemId,
            size: size,
            quantity: quantity,
          }),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("update quantity data is ", data);
        const { message, success } = data;
        if (success) {
          toast.success(message);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  // function that shows the cart Total  amount or sum
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartData) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartData[items]) {
        try {
          if (cartData[items][item] > 0) {
            totalAmount += itemInfo.price * cartData[items][item];
          }
        } catch (error) {
          return error;
        }
      }
    }
    return totalAmount;
  };

  // function to fetch all the products from backend
  const getAllProducts = async () => {
    try {
      const url = `${backend_url}/api/v1/ecommerce/products/allProducts`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.productList);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    products,
    token,
    setToken,
    showSearch,
    setShowSearch,
    searchInput,
    setSearchInput,
    addToCart,
    removeFromCart,
    cartData,
    setCartData,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getAllProducts,
    delivery_fee,
    userName,
    setUserName,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
