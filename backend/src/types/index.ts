export interface TBlockNumberResponse {
  jsonrpc: string;
  result: number;
  id: number;
}

export interface StarknetResponse<T> {
  jsonrpc: string;
  id: number;
  result: T;
}

type ActualFee = {
  amount: string;
  unit: string;
};

export interface EventData {
  blockNumber: number;
  timestamp: number;
  id: string;
}

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
  blockNumber: number;
  type: TransactionType;
  calldata?: string[];
  actual_fee?: string;
  execution_resources?: ExecutionResources;
  events?: EventData[];
  sender_address?: string;
  unix_timestamp?: number;
  timestamp?: number;
  nonce?: string;
  position?: number;
  version?: number;
  signature?: string[];
  max_fee?: string;
  gasConsumed?: string;
}
