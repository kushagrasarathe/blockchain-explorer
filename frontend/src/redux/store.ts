import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactions-slice";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export default store;
