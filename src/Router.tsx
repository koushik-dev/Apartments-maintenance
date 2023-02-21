import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flats, Home, Login, Maintenance, People, SplitUp } from "./Pages";
import Details from "./Pages/Details";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/apartments" element={<Flats />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="people" element={<People />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="details" element={<Details />} />
          <Route path="splitup/:id" element={<SplitUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
