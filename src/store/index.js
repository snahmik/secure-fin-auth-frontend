import {configureStore, createSlice} from "@reduxjs/toolkit";
import {formatRM, getCurrentDateTime} from "../utils/formatterUtils.js";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    activeUserId: null,
    isAuthenticated: false,
    role: 'guest'
  },
  reducers: {
    login: (state, action) => {
      state.activeUserId = 123;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      console.log("login redux:" + action.payload.role)
    },
    logout: (state) => {
      state.activeUserId = null;
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
        const {timestamp,sender,amount} = action.payload;
        state.userTransactions.push(createUserTransactionRecord(timestamp,sender,sender,amount));
      },
      transfer: (state, action) => {
        state.balance -= action.payload.amount;
        const {timestamp,sender,recipient,amount} = action.payload;

        state.userTransactions.push(createUserTransactionRecord(timestamp,sender,recipient,-Math.abs(amount)));
      }
    }
  }

)

const store = configureStore({reducer: {auth: authSlice.reducer,userAccount: userAccountSlice.reducer }});
export const authActions = authSlice.actions;
export const userAccountActions = userAccountSlice.actions;
export default store;

export function createUserTransactionRecord(timestamp,sender,recipient,amount){
  const isDeposit = sender === recipient

  const formattedDate = getCurrentDateTime(timestamp);

  if (isDeposit) {
    return {date: formattedDate,description: `Deposit`,amount: `${formatRM(amount)}`,status:"approved"}
  }

  //External transfer
  if (amount < 0) {
    return {date: formattedDate,description: `Transfer to ${recipient}`,amount: `${formatRM(amount)}`,status:"pending"}
  }

  return {date: formattedDate,description: `Transfer from ${recipient}`,amount: `${formatRM(amount)}`,status:"pending"}
}

