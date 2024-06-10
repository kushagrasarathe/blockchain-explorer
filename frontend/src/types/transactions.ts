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

// export type TTransactionDetails = {
//   _id: number;
//   transactionHash: string;
//   __v: number;
//   blockNumber: number;
//   calldata: string[];
//   createdAt: string;
//   signature: string[];
//   timestamp: number;
//   type: TTransactionType;
//   updatedAt: string;
//   version: number;
//   actualFeeUSD: string;
// };

export interface Event {
  blockNumber: number;
  timestamp: number;
  id: string;
}

export type ExecutionResources = Record<
  string,
  number | Record<string, number>
>;
// interface ExecutionResources {
//   steps: number;
//   pedersen_builtin_applications: number;
//   range_check_builtin_applications: number;
//   bitwise_builtin_applications: number;
//   ec_op_builtin_applications: number;
//   data_availability: {
//     l1_gas: number;
//     l1_data_gas: number;
//   };
// }

export interface TTransactionDetails {
  _id: string;
  transactionHash: string;
  __v: number;
  blockNumber: number;
  position: number;
  calldata: string[];
  createdAt: string;
  events: Event[];
  execution_resources: ExecutionResources;
  max_fee: string;
  gasConsumed: string;
  nonce: string;
  sender_address: string;
  signature: string[];
  timestamp: number;
  type: string;
  unix_timestamp: number;
  updatedAt: string;
  version: number;
  actualFeeUSD: string;
}
