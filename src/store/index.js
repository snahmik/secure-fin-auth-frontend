import {configureStore, createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    role: 'guest'
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      console.log("login redux:" + action.payload.role)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = 'guest';
      console.log("logout redux")
    }
  }
})

const store = configureStore({reducer: {auth: authSlice.reducer}});
export const authActions = authSlice.actions;
export default store;

