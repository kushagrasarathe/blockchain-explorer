import { TransactionsState } from "@/types/redux/transactions-state";
import { TTransaction } from "@/types/transactions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRANSACTIONS } from "../constants";

// states
const initialState: TransactionsState = {
  allTransactions: [],
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
  },
});

export default transactionsSlice.reducer;
export const transactionsActions = transactionsSlice.actions;
