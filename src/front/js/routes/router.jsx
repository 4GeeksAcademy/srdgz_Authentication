import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../views/HomePage.jsx";
import DetailPage from "../views/DetailPage.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import LoginPage from "../views/LoginPage.jsx";
import SingupPage from "../views/SingupPage.jsx";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Router = () => {
  return (
    <BrowserRouter basename="">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Singup" element={<SingupPage />} />
        <Route path="/:uid" element={<DetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
