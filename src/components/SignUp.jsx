import React, { useState } from "react";
import "../css/auth.css";
import side_image from "../images/auth_side_pic.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../API";

const cookies = new Cookies();

const SignUp = () => {
  const initialValues = { username: "", password: "", email: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const [error, setError] = useState();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const createAccount = async e => {
    e.preventDefault();

    await axios
      .post(`${BASE_URL}/signup`, {
        email: formValues.email,
        password: formValues.password,
        username: formValues.username
      })
      .then(res => {
        const data = res.data;
        if (data.status_code === 200) {
          cookies.set("auth_token", data["auth_token"]);
          window.location = "login";
        } else {
          setError(data.detail);
        }
      })
      .catch(err => setError(err.data));

    setFormValues(initialValues);
  };

  return (
    <div className="h-screen w-full flex" style={{ background: "#f2f2f2" }}>
      <div className="flex self-center justify-center px-5 sm:w-3/4 sm:mx-auto  md:p-0 lg:form w-full lg:w-1/2">
        <form className="flex flex-col self-center md:w-1/2 w-full lg:auth-form">
          <label className="text-sm sm:text-base">Enter Email:</label>
          <input
            type="text"
            placeholder="Enter your email...."
            onChange={handleChange}
            value={formValues.email}
            name="email"
            className={`h-10 text-sm my-2 sm:text-base auth-input w-full focus:h-10 ${
              error ? "active outline outline-red-500" : "outline-none"
            }`}
          />

          <label className="text-sm sm:text-base">Enter Username:</label>
          <input
            type="text"
            placeholder="Enter your username...."
            onChange={handleChange}
            value={formValues.username}
            name="username"
            className={`h-10 text-sm my-2 sm:text-base auth-input w-full focus:h-10 ${
              error ? "active outline outline-red-500" : "outline-none"
            }`}
          />
          <label className="text-sm sm:text-base">Enter Password:</label>
          <input
            type="password"
            placeholder="Enter your password...."
            onChange={handleChange}
            value={formValues.password}
            name="password"
            className={`h-10 text-sm my-2 sm:text-base auth-input w-full focus:h-10 ${
              error ? "active outline outline-red-500" : "outline-none"
            }`}
          />
          <button className="button mt-2" onClick={createAccount}>
            Sign up
          </button>
          <p className="my-3 text-sm mt-3 sm:text-base">
            Already have an account,{" "}
            <Link
              to="/login"
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
