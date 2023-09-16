import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(
        "The password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters"
      );
      return;
    }

    // Aquí va la lógica de inicio de sesión
  };

  return (
    <div className="container vh-100 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center my-5">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="email"
                    className="form-control py-3"
                    id="email"
                    name="email"
                    placeholder="email"
                    required
                    pattern={emailPattern.source}
                    title="Please enter a valid email"
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
                      pattern={passwordPattern.source}
                      title="The password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters"
                    />
                  </div>
                </div>
                <div class="form-check mb-5">
                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="check-password"
                        id="flexCheckDefault"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      Show password
                    </label>
                  </div>
                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      <input
                        class="form-check-input"
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

              <div className="my-4 text-center">
                <div>
                  <span>Don't have an account? </span>
                  <Link
                    to="/Singup"
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
