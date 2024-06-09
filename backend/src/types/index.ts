export interface StarknetResponse<T> {
  jsonrpc: string;
  id: number;
  result: T;
}

export interface TransactionReceipt {
  transaction_hash: string;
  actual_fee: string;
  status: string;
  block_number: number;
  executionResources: {
    steps: number;
    memory_holes: number;
  };
  events: any;
}

export interface Block {
  block_number: number;
  timestamp: number;
  transactions: Transaction[];
}

export type TransactionType =
  | 'declare'
  | 'deploy'
  | 'deploy_account'
  | 'invoke'
  | 'l1_handler';

export interface Transaction {
  _id: string;
  transactionHash: string;
  __v: number;
  blockNumber: number;
  contract_address: string;
  calldata: any[];
  createdAt: string;
  senderAddress: string;
  signature: any[];
  timestamp: number;
  type: TransactionType;
  updatedAt: string;
  version: number;
  actualFeeUSD?: string;
}
