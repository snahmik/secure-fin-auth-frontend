import {configureStore, createSlice} from "@reduxjs/toolkit";
import {formatTransactionRecord} from "../utils/formatterUtils.js";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    userAccountNumber: null,
    isAuthenticated: false,
    role: 'guest'
  },
  reducers: {
    authenticate: (state, action) => {
      const {userId,accountNumber,role} = action.payload;
      state.isAuthenticated = true;
      state.userId = userId;
      state.userAccountNumber = accountNumber;
      state.role = role;
    },setAccount: (state, action) =>{
      state.userAccountNumber = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userAccountNumber = null,
      state.userId = null;
      state.role = 'guest';
    }
  }
})

const userAccountSlice = createSlice({
    name: 'user',
    initialState: {
      balance: 0,
      transactions: []
    },
    reducers: {
      deposit: (state, action) => {
        state.balance += action.payload.amount;
        const {timestamp,sender,amount} = action.payload;

        // Using formatTransactionRecord from utils, mapping legacy fields to new structure
        state.transactions.push(formatTransactionRecord({
          sender_account: sender,
          recipient_account: sender,
          sender_name: sender,
          recipient_name: sender,
          amount: amount,
          status: 'approved',
          created_at: timestamp
        }, sender));
      },
      transfer: (state, action) => {
        state.balance -= action.payload.amount;
        const {timestamp,sender,recipient,amount} = action.payload;

        state.transactions.push(formatTransactionRecord({
          sender_account: sender,
          recipient_account: recipient,
          sender_name: sender,
          recipient_name: recipient,
          amount: amount,
          status: 'pending',
          created_at: timestamp
        }, sender));
      }
    }
  }
)

const store = configureStore({reducer: {auth: authSlice.reducer,userAccount: userAccountSlice.reducer }});
export const authActions = authSlice.actions;
export const userAccountActions = userAccountSlice.actions;
export default store;

