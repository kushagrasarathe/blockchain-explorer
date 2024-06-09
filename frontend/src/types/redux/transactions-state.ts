import { TTransaction, TTransactionDetails } from "../transactions";

export type TransactionsState = {
  allTransactions: TTransaction[];
  transactionDetails: TTransactionDetails | null;
};
