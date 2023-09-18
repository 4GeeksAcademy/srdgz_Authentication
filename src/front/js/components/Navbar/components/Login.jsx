import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="ms-auto">
      {token ? ( 
        <button
          className="btn btn-dark fw-bold me-3 my-3"
          onClick={handleLogout}
        >
          <i className="fa-regular fa-user pe-2"></i>LOGOUT
        </button>
      ) : (
        <Link to="/Login" className="btn btn-dark fw-bold me-3 my-3">
          <i className="fa-regular fa-user pe-2"></i>LOGIN
        </Link>
      )}
    </div>
  );
};

export default Login;