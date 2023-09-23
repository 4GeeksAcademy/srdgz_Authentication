import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
      <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-white">404</h1>
                <p className="fs-3 text-warning"> <span className="text-warning">Opps!</span> Page not found.</p>
                <p className="lead text-white">
                    The page you’re looking for doesn’t exist.
                  </p>
                  <Link to="/">
          <button type="button" className="btn btn-outline-light m-5">
            Go home
          </button>
        </Link>
            </div>
        </div>
  )
};

export default ErrorPage;
