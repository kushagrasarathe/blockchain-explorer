import { TransactionsState } from "@/types/redux/transactions-state";
import { TTransaction, TTransactionDetails } from "@/types/transactions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRANSACTIONS } from "../constants";

// states
const initialState: TransactionsState = {
  allTransactions: [],
  transactionDetails: null,
};

// slice
const transactionsSlice = createSlice({
  name: TRANSACTIONS,
  initialState,
  reducers: {
    // set all transactions
    setAllTransactions: (state, action: PayloadAction<TTransaction[]>) => {
      state.allTransactions = action.payload;
    },

    // set transcation details
    setTransactionDetails: (
      state,
      action: PayloadAction<TTransactionDetails>,
    ) => {
      // const { href } = action.payload;
      // state.programs[href] = {
      //   ...state.programs[href],
      //   ...action.payload,
      // };

      state.transactionDetails = action.payload;
    },
  },
});

export default transactionsSlice.reducer;
export const transactionsActions = transactionsSlice.actions;
