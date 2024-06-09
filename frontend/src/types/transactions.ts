export type TTransactionType =
  | "DECLARE"
  | "DEPLOY"
  | "DEPLOY_ACCOUNT"
  | "INVOKE"
  | "L1_HANDLER";

// export enum TTransactionType {
//   DECLARE = "declare",
//   DEPLOY = "deploy",
//   DEPLOY_ACCOUNT = "deploy_account",
//   INVOKE = "invoke",
//   L1_HANDLER = "l1_handler",
// }

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
