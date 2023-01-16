import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Navbar({ user }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <section className="sticky left-0 bg-white top-0 leading-[50px] mx-50 flex-row pl-5 md:sticky w-full">
      <div className="md:flex items-center justify-between md:w-3/5 mx-auto">
        <div className="md:flex cursor-pointer  md:justify-center md:items-center ">
          <Link to="/home">LOGO</Link>
        </div>
        {!openMenu && (
          <Bars3Icon
            onClick={() => setOpenMenu(!openMenu)}
            className="w-7 h-7 uppercase absolute right-8 top-3 cursor-pointer md:hidden"
          />
        )}
        {openMenu && (
          <XMarkIcon
            onClick={() => setOpenMenu(!openMenu)}
            className="w-7 h-7 uppercase absolute right-8 top-3 cursor-pointer md:hidden"
          />
        )}

        <ul
          className={` md:static md:justify-end absolute w-full bg-white md:opacity-100 left-0 top-0 md:z-auto z-[1] md:space-x-4 md:flex transition-all duration-500 pl-5   md:pl-0 ease-in ${
            openMenu ? "top-10 opacity-100" : "top-[-500px] opacity-0"
          }`}
        >
          <li>
            <NavLink
              to="/home"
              className="hover:underline hover:underline-offset-1"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/supprt"
              className="hover:underline hover:underline-offset-1"
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
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="hover:underline hover:underline-offset-1"
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
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/me/todos"
                  className="hover:underline hover:underline-offset-1"
                >
                  My Todos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="hover:underline hover:underline-offset-1"
                >
                  {user.username}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
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
  );
}

export default Navbar;
