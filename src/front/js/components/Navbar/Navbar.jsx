import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "./components/Dropdown.jsx";
import Login from "./components/Login.jsx";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark mb-3 sticky-top border-bottom border-dark-subtle">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mx-5 my-3 h1">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
              alt="logo"
              width="120"
              height="50"
            />
          </span>
        </Link>
        <Login />
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;
