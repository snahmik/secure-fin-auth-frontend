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

const userAccountSlice = createSlice({
    name: 'user',
    initialState: {
      balance: 1200,
      userTransactions: []
    },
    reducers: {
      deposit: (state, action) => {
        state.balance += action.payload.amount;
        console.log("deposit redux:")
      },
      transfer: (state, action) => {
        state.balance -= action.payload.amount;
        state.userTransactions.push(action.payload.transaction);
        console.log("transfer redux:")
      }
    }
  }

)

const store = configureStore({reducer: {auth: authSlice.reducer,userAccount: userAccountSlice.reducer }});
export const authActions = authSlice.actions;
export const userAccountActions = userAccountSlice.actions;
export default store;

