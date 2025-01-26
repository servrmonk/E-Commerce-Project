
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  isAuthenticated: !!localStorage.getItem("accessToken"), 
  loading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem("accessToken")
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginFun(state, action) {
    state.userData = action.payload.userData;
      state.isAuthenticated = true;
      state.isLoggedIn = true;

    },

    registerFun(state, action) {
      state.userData = action.payload.userData;
      state.isAuthenticated = true;
      state.isLoggedIn = true;

    
      localStorage.setItem("userData", JSON.stringify(action.payload.userData)); 
    },

    logoutFun(state) {
      state.userData = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginFun, registerFun, logoutFun, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
