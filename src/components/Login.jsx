import React, { useState } from "react";
import "../css/auth.css";
import side_image from "../images/auth_side_pic.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../API";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  const validate = e => {
    e.preventDefault();
    const { error } = Joi.validate(
      { email: user.email, password: user.password },
      schema,
      {
        abortEarly: false
      }
    );

    if (!error) return loginRequest();

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

  const loginRequest = async () => {
    await axios
      .post(`${BASE_URL}/auth_token`, {
        email: user.email,
        password: user.password
      })
      .then(res => {
        const data = res.data;
        if (data["status_code"] === 200) {
          cookies.set("auth_token", data.auth_token, { path: "/" });
          navigate("/me/todos/inbox");
          window.location.reload();
        } else {
          setErrors({ password: data.detail });
          setUser({ email: user.email, password: "" });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="h-screen w-full flex bg-bgcolor">
      <div className="flex self-center justify-center px-5 sm:w-3/4 sm:mx-auto  md:p-0 lg:form w-full lg:w-1/2">
        <form className="flex flex-col self-center md:w-1/2 w-full lg:auth-form">
          <label className="text-sm sm:text-base">Enter Email:</label>
          <input
            type="text"
            placeholder="Enter your email...."
            onChange={e => handleChange(e)}
            value={user.email}
            name="email"
            className="h-10 text-sm my-3 sm:text-base auth-input w-full outline-none focus:h-10"
            required
          />
          {errors.email && (
            <span className="text-red-500 mb-2">{errors.email}</span>
          )}

          <label className="text-sm sm:text-base">Enter Password:</label>
          <input
            type="password"
            placeholder="Enter your password...."
            onChange={e => handleChange(e)}
            value={user.password}
            name="password"
            className="h-10 text-sm my-3 sm:text-base outline-none auth-input w-full focus:h-10"
          />

          {errors.password && (
            <span className="text-red-500 mb-2">{errors.password}</span>
          )}

          <div className="flex items-center 4 mb-2">
            <input
              id="remember"
              className="accent-teal-700 m-1"
              type="checkbox"
              name="status"
            />
            <label className="text-sm sm:text-base my-1">
              Always remember me.
            </label>
          </div>

          <button className="button" onClick={validate}>
            Login
          </button>
          <p className="my-3 text-sm my-5 sm:text-base">
            Don't have an account,{" "}
            <Link
              to="/signup"
              className="text-indigo-700 hover:text-indigo-500 hover:underline"
            >
              sign up?
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

export default Login;
