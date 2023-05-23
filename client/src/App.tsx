import React from "react";
import {
  Faculties,
  Home,
  Universities,
  UniversityDetails,
  ErrorPage,
  FacultyDetails,
} from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Universities" element={<Universities />} />
        <Route path="/Universities/:id" element={<UniversityDetails />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/faculties/:id" element={<FacultyDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
