import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from '../models/block.model';
import { Transaction } from '../models/transaction.model';
import { BlockchainService } from './blockchain.service';

@Injectable()
export class DataSyncService {
  private readonly logger = new Logger(DataSyncService.name);

  constructor(
    @InjectModel(Block.name) private blockModel: Model<Block>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private blockchainService: BlockchainService,
  ) {}

  async syncInitialData() {
    const latestBlock = await this.blockchainService.getLatestBlockNumber();
    const startBlock = Math.max(0, latestBlock - 10);

    for (
      let blockNumber = startBlock;
      blockNumber <= latestBlock;
      blockNumber++
    ) {
      await this.syncBlock(blockNumber);
    }
  }

  async syncBlock(blockNumber: number) {
    const blockData = await this.blockchainService.getBlockWithTransactions(
      blockNumber,
    );

    // Save block
    await this.blockModel.findOneAndUpdate(
      { blockNumber: blockData?.block_number },
      { timestamp: blockData?.timestamp },
      { upsert: true, new: true },
    );

    // Save transactions
    if (blockData && blockData.transactions) {
      for (const tx of blockData.transactions) {
        await this.transactionModel.findOneAndUpdate(
          { transactionHash: tx.transaction_hash },
          {
            blockNumber: blockData?.block_number,
            type: tx.type,
            timestamp: blockData?.timestamp,
            senderAddress: tx.contract_address,
            version: tx.version,
            // Add more fields as needed
          },
          { upsert: true, new: true },
        );

        // If it's an INVOKE transaction, fetch and save more details
        if (tx.type === 'INVOKE' && tx.version === '0x1') {
          // Fetch and save additional details
        }
      }
    }
  }

  async startPolling() {
    setInterval(async () => {
      const latestBlock = await this.blockchainService.getLatestBlockNumber();
      const lastSyncedBlock = await this.blockModel
        .findOne({}, { blockNumber: 1 })
        .sort({ blockNumber: -1 });

      if (lastSyncedBlock && latestBlock > lastSyncedBlock.blockNumber) {
        for (
          let blockNumber = lastSyncedBlock.blockNumber + 1;
          blockNumber <= latestBlock;
          blockNumber++
        ) {
          await this.syncBlock(blockNumber);
        }
      }
    }, 30000); // 30 seconds
  }
}
