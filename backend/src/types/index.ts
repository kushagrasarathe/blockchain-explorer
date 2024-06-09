export interface TBlockNumberResponse {
  jsonrpc: string;
  result: number;
  id: number;
}

// export interface TTransactionReceiptResponse {
//   jsonrpc: string;
//   result: {
//     type: TransactionType;
//     transaction_hash: string;
//     actual_fee: any;
//     execution_status: string;
//     finality_status: string;
//     messages_sent: any[];
//     events: any[];
//     execution_resources: any;
//   };
//   id: number;
// }

export interface StarknetResponse<T> {
  jsonrpc: string;
  id: number;
  result: T;
}

type ActualFee = {
  amount: string;
  unit: string;
};

type EventData = {
  from_address: string;
  keys: string[];
  data: string[];
};

export type ExecutionResources = {
  steps: number;
  pedersen_builtin_applications: number;
  range_check_builtin_applications: number;
  bitwise_builtin_applications: number;
  ec_op_builtin_applications: number;
};

export type TransactionReceipt = {
  type: string;
  transaction_hash: string;
  actual_fee: ActualFee;
  execution_status: string;
  finality_status: string;
  block_hash: string;
  block_number: number;
  messages_sent: any[];
  events: EventData[];
  execution_resources: ExecutionResources;
};

export interface Block {
  status: string;
  block_hash: string;
  parent_hash: string;
  block_number: 647380;
  new_root: string;
  timestamp: 1717937350;
  sequencer_address: string;
  l1_gas_price: { price_in_fri: string; price_in_wei: string };
  l1_data_gas_price: { price_in_fri: string; price_in_wei: string };
  l1_da_mode: string;
  starknet_version: string;
  transactions: Transaction[];
}

export type TransactionType =
  | 'DECLARE'
  | 'DEPLOY'
  | 'DEPLOY_ACCOUNT'
  | 'INVOKE'
  | 'L1_HANDLER';

export interface Transaction {
  transaction_hash: string;
  type: TransactionType;
  version: string;
  nonce: string;
  max_fee: string;
  sender_address: string;
  signature: any[];
  calldata: any[];

  // transactionHash: string;
  // _id: string;
  // __v: number;
  // nonce: string;
  // blockNumber: number;
  // contract_address: string;
  // calldata: any[];
  // createdAt: string;
  // senderAddress: string;
  // signature: any[];
  // timestamp: number;
  // type: TransactionType;
  // updatedAt: string;
  // version: number;
  // actualFeeUSD?: string;
}
