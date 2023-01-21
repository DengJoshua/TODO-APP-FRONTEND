import "./index.css";
import React, { useState, useEffect } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Todos from "./components/Todos";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BASE_URL } from "./services/userService";
import Cookies from "universal-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Support from "./components/Support";

const cookies = new Cookies();

const App = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const auth_token = cookies.get("auth_token");

  useEffect(() => {
    (async () => {
      try {
        const data = jwtDecode(cookies.get("auth_token"));
        return await axios
          .get(`${BASE_URL}/users/${data.user_id}`, {
            headers: {
              Authorization: `Bearer ${cookies.get("auth_token")}`
            }
          })
          .then(res => setUser(res.data))
          .catch(err => console.log(err));
      } catch (error) {
        return null;
      }
    })();
    setIsLoading(false);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <span className="ml-2">Loading....</span>
        </div>
      ) : (
        <React.Fragment>
          <main className="w-full h-full font-sans">
            <Navbar user={user} />

            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/support" element={<Support />} />
              <Route
                path="/me/todos"
                element={
                  auth_token ? <Todos user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={auth_token ? <Navigate to="/me/todos" /> : <Login />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/not-found" element={<h1>Page not found</h1>} />
            </Routes>
          </main>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
