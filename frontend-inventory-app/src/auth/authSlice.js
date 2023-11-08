// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser(state) {
      state.currentUser = null;
      state.token = null;
      state.isLogin = false;
      localStorage.clear("token");
    },
  },
});

export const { setUser, setToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;
