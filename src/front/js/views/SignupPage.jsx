import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUser } from "../services/createUser";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setFormData({
      ...formData,
      email: email,
    });
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setFormData({
      ...formData,
      password: password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await createUser(formData);

      if (response.status === 200) {
        alert("User created successfully");
        navigate("/");
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="container vh-100 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center my-5">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="email"
                    className="form-control py-3"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    title="Please enter a valid email"
                    value={formData.email}
                    onChange={handleChangeEmail}
                  />
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-3"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      title="The password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters"
                      value={formData.password}
                      onChange={handleChangePassword}
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
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-warning w-60 fw-bold px-5 py-2"
                  >
                    SIGN UP
                  </button>
                </div>
              </form>

              <div className="my-4 text-center">
                <div>
                  <span>Already have an account? </span>
                  <Link
                    to="/Login"
                    className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-bold"
                  >
                    Log In
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

export default SignupPage;
