import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import Bottleneck from 'bottleneck';
import { Block, StarknetResponse, TransactionReceipt } from 'src/types';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private readonly apiUrl = 'https://free-rpc.nethermind.io/mainnet-juno';
  private readonly client = axios.create({
    baseURL: this.apiUrl,
    headers: { 'Content-Type': 'application/json' },
  });
  private readonly limiter: Bottleneck;

  constructor() {
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1000, // 1 second interval between requests
      reservoir: 60, // Number of requests
      reservoirRefreshAmount: 60, // Reset the request count
      reservoirRefreshInterval: 60 * 1000, // Every 60 seconds
    });

    this.limiter.on('error', (error) => {
      this.logger.error('Bottleneck Error', error);
    });
  }

  private async request<T>(method: string, params: any[]): Promise<T> {
    try {
      const response: AxiosResponse<StarknetResponse<T>> =
        await this.limiter.schedule(() =>
          this.client.post('', {
            jsonrpc: '2.0',
            method,
            params,
            id: 1,
          }),
        );
      return response.data.result;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  private handleApiError(error: any): never {
    this.logger.error('API Error', error);
    if (error.response) {
      switch (error.response.status) {
        case 429: // Too Many Requests
          throw new HttpException(
            'Rate limit exceeded. Please try again later.',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        case 500:
        case 502:
        case 503:
        case 504:
          throw new HttpException(
            'API server error. Please try again later.',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        default:
          throw new HttpException(
            'An error occurred',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
    throw new HttpException('Network error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async getLatestBlockNumber(): Promise<number> {
    const result = await this.request<string>('starknet_blockNumber', []);
    return parseInt(result, 16);
  }

  async getBlockWithTransactions(blockNumber: number): Promise<Block> {
    return this.request<Block>('starknet_getBlockWithTxs', [
      { block_number: blockNumber },
    ]);
  }

  async getTransactionReceipt(txHash: string): Promise<TransactionReceipt> {
    return this.request<TransactionReceipt>('starknet_getTransactionReceipt', [
      txHash,
    ]);
  }
}
