export type TTransactionType =
  | "DECLARE"
  | "DEPLOY"
  | "DEPLOY_ACCOUNT"
  | "INVOKE"
  | "L1_HANDLER";

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

export type TTransactionDetails = {
  _id: number;
  transactionHash: string;
  __v: number;
  blockNumber: number;
  calldata: string[];
  createdAt: string;
  signature: string[];
  timestamp: number;
  type: TTransactionType;
  updatedAt: string;
  version: number;
  actualFeeUSD: string;
};
