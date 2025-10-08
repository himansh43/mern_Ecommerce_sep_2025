import React from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useStoreContext } from "../Context/StoreContext";
import { useEffect } from "react";
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token, setCartData,backend_url } = useStoreContext();
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const url = `${backend_url}/api/v1/ecommerce/orders/verifyStripe`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ success, orderId }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("verify stripe data from frontend is", data);
      const { success: succRes, message } = data;
      if (succRes) {
        setCartData({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Payment verified</div>;
};

export default Verify;
