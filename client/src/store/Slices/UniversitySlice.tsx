import { createSlice } from "@reduxjs/toolkit";

const readData = JSON.parse(localStorage.getItem("userState"));
// Retrieving the "userState" data from the localStorage and parsing it as JSON

const initialState = {
  username: readData?.username || "",
  email: readData?.email || "",
  token: readData?.token || "", 
  userID: readData?.userID || "",
};
// Defining the initial state object with properties retrieved from "readData"
// If any property is missing or undefined, it falls back to an empty string

export const userSlice = createSlice({ // Creating a Redux slice named "userSlice" with initial state and reducer functions
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, userID, token, username } = action.payload;
      // Extracting email, id, token, and name from the action payload

      state.email = email;
      state.userID = userID;
      state.token = token;
      state.username = username;
      // Updating the state properties with the new values from the action payload

      localStorage.setItem("userState", JSON.stringify(state));
      // Storing the updated state in the localStorage as a stringified JSON
    },
    updateUserStateData: (state, action, username) => {
      const { email, userID, token } = action.payload;
      state.email = email;
      state.userID = userID;
      state.token = token;
      state.username = username;
    
      localStorage.setItem('userState', JSON.stringify(state));
    },

    logout: (state) => {
      state.email = "";
      state.token = "";
      state.userID = "";
      state.username = "";
      // Resetting the state properties to empty strings

      localStorage.removeItem("userState");
      // Removing the "userState" data from the localStorage
    },
  },
});

export const { login, logout, updateUserStateData } = userSlice.actions;
// Exporting the generated action creators for the login, logout, and updateUserStateData reducers