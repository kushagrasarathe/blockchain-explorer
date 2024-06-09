export type TTransactionType =
  | "declare"
  | "deploy"
  | "deploy_account"
  | "invoke"
  | "l1_handler";

export type TTransaction = {
  _id: string;
  transactionHash: string;
  __v: number;
  blockNumber: number;
  calldata: any[];
  createdAt: string;
  senderAddress: string;
  signature: any[];
  timestamp: number;
  type: TTransactionType;
  updatedAt: string;
  version: number;
  actualFeeUSD?: string;
};
