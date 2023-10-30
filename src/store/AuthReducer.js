import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
};

if (initialAuthState.token) {
  initialAuthState.isLoggedIn = true;
} else {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
