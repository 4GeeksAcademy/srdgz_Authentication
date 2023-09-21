import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../views/HomePage.jsx";
import DetailPage from "../views/DetailPage.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import LoginPage from "../views/LoginPage.jsx";
import SignupPage from "../views/SignupPage.jsx";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Router = () => {
  return (
    <BrowserRouter basename="">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:resourceType:uid" element={<DetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
