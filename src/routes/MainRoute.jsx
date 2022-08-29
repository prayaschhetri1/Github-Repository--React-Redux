import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Repository from "./../pages/Repository";
import Followers from "./../pages/Followers";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repository/:id" element={<Repository />} />
      <Route path="/followers" element={<Followers />} />
    </Routes>
  );
};

export default MainRoute;
