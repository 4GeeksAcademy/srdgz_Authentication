import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="ms-auto">
      <Link to="/Login" className="btn btn-dark fw-bold me-3 my-3">
        <i className="fa-regular fa-user pe-2"></i>LOGIN
      </Link>
    </div>
  );
};

export default Login;