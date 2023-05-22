import { createSlice } from "@reduxjs/toolkit";

const readData = JSON.parse(localStorage.getItem("universityState"));
// Retrieving the "userState" data from the localStorage and parsing it as JSON

const initialState = {
  name: readData?.name || "",
  address: readData?.address || "",
  faculties: readData?.faculties || "", 
};
// Defining the initial state object with properties retrieved from "readData"
// If any property is missing or undefined, it falls back to an empty string

export const userSlice = createSlice({ // Creating a Redux slice named "userSlice" with initial state and reducer functions
  name: "University",
  initialState,
  reducers: {
    login: (state, action) => {
      const { address, faculties, name } = action.payload;
      // Extracting address, id, faculties, and name from the action payload

      state.address = address;
      state.faculties = faculties;
      state.name = name;
      // Updating the state properties with the new values from the action payload

      localStorage.setItem("universityState", JSON.stringify(state));
      // Storing the updated state in the localStorage as a stringified JSON
    },
    
    updateUniversityStateData: (state, action, name) => {
      const { address, faculties } = action.payload;
      state.address = address;
      state.faculties = faculties;
      state.name = name;
    
      localStorage.setItem('universityState', JSON.stringify(state));
    },

    logout: (state) => {
      state.address = "";
      state.faculties = "";
      state.name = "";
      // Resetting the state properties to empty strings

      localStorage.removeItem("universityState");
      // Removing the "UniversityState" data from the localStorage
    },
  },
});

export const { login, logout, updateUniversityStateData } = userSlice.actions;