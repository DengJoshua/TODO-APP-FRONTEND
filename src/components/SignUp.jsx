import React, { useState } from "react";
import "../css/auth.css";
import side_image from "../images/auth_side_pic.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../API";

const cookies = new Cookies();

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const createAccount = async e => {
    e.preventDefault();

    await axios
      .post(`${BASE_URL}/signup`, { email, password, username })
      .then(res => {
        const data = res.data;
        cookies.set("auth_token", data["auth_token"]);
      })
      .catch(err => console.log(err));

    setEmail("");
    setPassword("");
    setUsername("");
    navigate("/login");
  };

  return (
    <div className="h-screen w-full flex" style={{ background: "#f2f2f2" }}>
      <div className="flex self-center justify-center px-5 sm:w-3/4 sm:mx-auto  md:p-0 lg:form w-full lg:w-1/2">
        <form className="flex flex-col self-center md:w-1/2 w-full lg:auth-form">
          <label className="text-sm sm:text-base">Enter Email:</label>
          <input
            type="text"
            placeholder="Enter your email...."
            onChange={e => setEmail(e.target.value)}
            value={email}
            name="title"
            className="h-10 text-sm sm:text-base auth-input w-full focus:h-10"
            required
          />
          <label className="text-sm sm:text-base">Enter Username:</label>
          <input
            type="text"
            placeholder="Enter your username...."
            onChange={e => setUsername(e.target.value)}
            value={username}
            name="title"
            className="h-10 text-sm sm:text-base auth-input w-full focus:h-10"
          />
          <label className="text-sm sm:text-base">Enter Password:</label>
          <input
            type="password"
            placeholder="Enter your password...."
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="title"
            className="h-10 text-sm sm:text-base auth-input w-full focus:h-10"
          />

          <button className="button" onClick={createAccount}>
            Sign up
          </button>
          <p className="my-3 text-sm sm:text-base">
            Already have an account,{" "}
            <Link
              to="/signup"
              className="text-indigo-700 hover:text-indigo-500 hover:underline"
            >
              sign in?
            </Link>
          </p>
        </form>
      </div>
      <img
        src={side_image}
        className="h-screen hidden lg:w-1/2 lg:block"
        alt="Side_image"
      />
    </div>
  );
};

export default SignUp;
