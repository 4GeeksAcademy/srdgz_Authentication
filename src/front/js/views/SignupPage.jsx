import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUser } from "../services/createUser";

const SignupPage = () => {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(
        "The password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters"
      );
      return;
    }

    // Aquí verificamos si el nombre de usuario ya existe en la base de datos.
    //const isUsernameAvailable = await checkUsernameAvailability(username);

    //if (!isUsernameAvailable) {
      //alert("Username is not available. Please choose a different one.");
      //return;
   // }

    const user = {
      username,
      email,
      password,
    };

    try {
      const response = await createUser(user);
      if (response.status === 201) {
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

  // Función para verificar la disponibilidad del nombre de usuario.
  //const checkUsernameAvailability = async (username) => {
    // Realiza una solicitud a tu API o servidor para verificar la disponibilidad del nombre de usuario.
    // Debe devolver true si está disponible y false si no lo está.
    // Implementa esta función según tu infraestructura de backend.
    // Por ahora, puedes devolver true para fines de prueba.
    //return true;
 // };

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
                    type="text"
                    className="form-control py-3"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="email"
                    className="form-control py-3"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    pattern={emailPattern.source}
                    title="Please enter a valid email"
                    value={formData.email}
                    onChange={handleChange}
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
                      pattern={passwordPattern.source}
                      title="The password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters"
                      value={formData.password}
                      onChange={handleChange}
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
