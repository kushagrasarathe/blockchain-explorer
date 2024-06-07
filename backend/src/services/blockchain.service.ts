import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private readonly apiUrl = 'https://free-rpc.nethermind.io/mainnet-juno';

  async getLatestBlockNumber(): Promise<number> {
    try {
      const response = await axios.post(this.apiUrl, {
        jsonrpc: '2.0',
        method: 'starknet_blockNumber',
        params: [],
        id: 1,
      });
      return parseInt(response.data.result, 16);
    } catch (error) {
      this.logger.error('Failed to get latest block number', error);
      throw error;
    }
  }

  async getBlockWithTransactions(blockNumber: number) {
    try {
      const response = await axios.post(this.apiUrl, {
        jsonrpc: '2.0',
        method: 'starknet_getBlockWithTxs',
        params: [{ block_number: blockNumber }],
        id: 1,
      });
      return response.data.result;
    } catch (error) {
      this.logger.error(`Failed to get block ${blockNumber}`, error);
      throw error;
    }
  }
}
