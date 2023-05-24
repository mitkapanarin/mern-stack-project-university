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
import SideBar from "./components/SideBar";


const App = () => {
  return (
    <BrowserRouter>
      <SideBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:id" element={<UniversityDetails />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/faculties/:id" element={<FacultyDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
};

export default App;
