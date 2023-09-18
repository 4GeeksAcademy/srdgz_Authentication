import React from "react";
import { Link } from "react-router-dom";

import useAppContext from "../../../contexts/AppContext.jsx";

const Login = () => {
  const { store, actions } = useAppContext();
  return (
    <div className="ms-auto">
      { !store.token ?
      <Link to="/Login" className="btn btn-dark fw-bold me-3 my-3">
        <i className="fa-regular fa-user pe-2"></i>LOGIN
      </Link>
      :
      <button className="btn btn-dark fw-bold me-3 my-3" onClick={() => actions.logout()}><i className="fa-regular fa-user pe-2"></i>Logout</button>
}
    </div>
  );
};

export default Login;