import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
function Navbar({ user }) {
  const [openMenu, setOpenMenu] = useState(false);

  const cookie = new Cookies();

  const logout = async () => {
    await cookie.remove("auth_token", { path: "/" });
    setOpenMenu(false);
    window.location = "/home";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        color: "#000"
      }}
    >
      <Typography component="div">
        <section className="bg-white left-0 bg-white top-0 leading-[50px] mx-50 flex-row pl-5 lg:sticky w-full">
          <div className="lg:hidden items-center justify-between lg:w-4/5 xl:w-3/5 mx-auto">
            <div className="cursor-pointer">
              <Link to="/home">LOGO</Link>
            </div>
            {!openMenu && (
              <Bars3Icon
                onClick={() => setOpenMenu(!openMenu)}
                className="w-7 h-7 uppercase absolute right-8 top-3 cursor-pointer lg:hidden"
              />
            )}
            {openMenu && (
              <XMarkIcon
                onClick={() => setOpenMenu(!openMenu)}
                className="w-7 h-7 uppercase absolute right-8 top-3 cursor-pointer lg:hidden"
              />
            )}

            <ul
              className={` lg:static lg:justify-end absolute w-full bg-white lg:opacity-100 left-0 top-0 lg:z-auto z-[1] lg:space-x-4 lg:flex transition-all duration-500 pl-5   lg:pl-0 ease-in ${
                openMenu ? "top-10 opacity-100" : "top-[-500px] opacity-0"
              }`}
            >
              <li>
                <NavLink
                  to="/home"
                  className="hover:underline hover:underline-offset-1"
                  onClick={() => setOpenMenu(false)}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/support"
                  className="hover:underline hover:underline-offset-1"
                  onClick={() => setOpenMenu(false)}
                >
                  Support
                </NavLink>
              </li>
              {!user && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/login"
                      className="hover:underline hover:underline-offset-1"
                      onClick={() => setOpenMenu(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className="hover:underline hover:underline-offset-1"
                      onClick={() => setOpenMenu(false)}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/settings"
                      className="hover:underline hover:underline-offset-1"
                      onClick={() => setOpenMenu(false)}
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/me/todos/inbox"
                      className="hover:underline hover:underline-offset-1"
                      onClick={() => setOpenMenu(false)}
                    >
                      My Todos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className="hover:underline hover:underline-offset-1"
                      onClick={() => setOpenMenu(false)}
                    >
                      {user.username}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => logout()}
                      className="hover:underline hover:underline-offset-1"
                    >
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </section>
      </Typography>
    </AppBar>
  );
}

export default Navbar;
