import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, userName, setUserName } = useStoreContext();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  console.log("token is", token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backend_url}/api/v1/ecommerce/users/${
        isLogin ? "login" : "signup"
      }`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: isLogin
          ? JSON.stringify({ email: email, password: password })
          : JSON.stringify({ name: name, email: email, password: password }),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      const { success, message } = data;
      if (success) {
        toast.success(message);
        setName(""), setEmail(""), setPassword("");
        setToken(data.token);
        localStorage.setItem("E-commerce-Token", JSON.stringify(data.token));
        const loginName = data.user.name;
        const firstLetter = loginName.split("")[0].toUpperCase();
        const restLetters = loginName.slice(1).toLowerCase();
        setUserName(`${firstLetter}${restLetters}`);
        localStorage.setItem(
          "user-name",
          JSON.stringify(`${firstLetter}${restLetters}`)
        );
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="flex flex-col  w-120 py-10 justify-center items-center">
        <p className="timesNewRoman text-3xl text-gray-700 text-center mb-5">
          {isLogin ? "Login" : "Signup"}
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            {!isLogin ? (
              <div className="w-full">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="px-3 mb-5 py-2 border border-gray-400 w-full outline-0"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              required
              placeholder="Email"
              className="px-3 mb-5 py-2 border border-gray-400 w-full outline-0"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              required
              placeholder="password"
              className="px-3 mb-1 py-2 border border-gray-400 w-full outline-0"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-full mb-5">
            {isLogin ? (
              <p className="cursor-pointer">Forgot your password?</p>
            ) : (
              ""
            )}

            {isLogin ? (
              <p className="cursor-pointer" onClick={() => setIsLogin(false)}>
                Create Account
              </p>
            ) : (
              <p
                className="cursor-pointer text-red-500 font-medium"
                onClick={() => setIsLogin(true)}
              >
                Login?
              </p>
            )}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-black text-white px-3 py-2 cursor-pointer"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
