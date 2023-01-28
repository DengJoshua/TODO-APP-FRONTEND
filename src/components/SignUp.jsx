import React, { useState } from "react";
import "../css/auth.css";
import side_image from "../images/auth_side_pic.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../API";
import Joi from "joi-browser";

const cookies = new Cookies();

const SignUp = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    username: Joi.string()
      .required()
      .label("Username")
      .min(4)
  };

  const validate = e => {
    e.preventDefault();
    const { error } = Joi.validate(
      { email: user.email, password: user.password, username: user.username },
      schema,
      {
        abortEarly: false
      }
    );

    if (!error) return createAccount();

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return setErrors(errors);
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const objSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, objSchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorsObj = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsObj[input.name] = errorMessage;
    else delete errorsObj[input.name];

    const userDetails = { ...user };
    userDetails[input.name] = input.value;
    setErrors(errorsObj);
    setUser(userDetails);
  };

  const createAccount = async e => {
    e.preventDefault();

    await axios
      .post(`${BASE_URL}/signup`, {
        email: user.email,
        password: user.password,
        username: user.username
      })
      .then(res => {
        const data = res.data;
        if (data["status_code"] == 200) {
          cookies.set("auth_token", data["auth_token"]);
          window.location = "/me/todos";
        } else {
          setErrors({ email: data.detail });
          setUser({ email: user.email, username: user.username, password: "" });
        }
      })
      .catch(err => console.log(err));
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
            value={user.email}
            name="email"
            className="h-10 text-sm my-2 sm:text-base auth-input w-full focus:h-10
            outline-none"
          />
          {errors.email && (
            <span className="text-red-500 mb-2">{errors.email}</span>
          )}

          <label className="text-sm sm:text-base">Enter Username:</label>
          <input
            type="text"
            placeholder="Enter your username...."
            onChange={handleChange}
            value={user.username}
            name="username"
            className="h-10 text-sm my-2 sm:text-base auth-input w-full focus:h-10 outline-none"
          />
          {errors.username && (
            <span className="text-red-500 mb-2">{errors.username}</span>
          )}
          <label className="text-sm sm:text-base">Enter Password:</label>
          <input
            type="password"
            placeholder="Enter your password...."
            onChange={handleChange}
            value={user.password}
            name="password"
            className="h-10 text-sm my-2 sm:text-base auth-input w-full focus:h-10outline-none"
          />
          {errors.password && (
            <span className="text-red-500 mb-2">{errors.password}</span>
          )}
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
