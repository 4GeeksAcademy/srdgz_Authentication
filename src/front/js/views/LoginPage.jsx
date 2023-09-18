import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/authService";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && token !== "" && token !== undefined) {
      setAuthenticated(true);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.token)
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="container vh-100 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <h2 className="card-title text-center my-5">Login</h2>
              {authenticated ? (
                <button
                  type="button"
                  className="btn btn-danger w-60 fw-bold px-5 py-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="email"
                    className="form-control py-3"
                    id="email"
                    name="email"
                    placeholder="email"
                    required
                    title="Please enter a valid email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-3"
                      id="password"
                      name="password"
                      placeholder="password"
                      required
                      minLength="8"
                      title="The password must contain at least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-check mb-5">
                  <div>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="check-password"
                        id="flexCheckDefault"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      Show password
                    </label>
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => setRememberUser(!rememberUser)}
                      />
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-warning w-60 fw-bold px-5 py-2"
                  >
                    SIGN IN
                  </button>
                </div>
              </form>
              )}
              <div className="my-4 text-center">
                <div>
                  <span>Don't have an account? </span>
                  <Link
                    to="/Signup"
                    className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-bold"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
