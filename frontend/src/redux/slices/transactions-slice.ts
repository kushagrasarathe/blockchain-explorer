import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRANSACTIONS } from "../constants";
import { TransactionsState } from "@/types/redux/transactions-state";

// states
const initialState: TransactionsState = {};

// slice
const transactionsSlice = createSlice({
  name: TRANSACTIONS,
  initialState,
  reducers: {},
});

export default transactionsSlice.reducer;
export const transactionsActions = transactionsSlice.actions;
