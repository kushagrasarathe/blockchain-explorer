import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/models/event.model';
import { Block } from '../models/block.model';
import { Transaction } from '../models/transaction.model';
import { BlockchainService } from './blockchain.service';

@Injectable()
export class DataSyncService {
  private readonly logger = new Logger(DataSyncService.name);

  constructor(
    @InjectModel(Block.name) private blockModel: Model<Block>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private blockchainService: BlockchainService,
  ) {}

  async syncInitialData() {
    const latestBlock = await this.blockchainService.getLatestBlockNumber();

    for (
      let blockNumber = latestBlock - 10;
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

    await this.blockModel.findOneAndUpdate(
      { blockNumber: blockData?.block_number },
      { timestamp: blockData?.timestamp },
      { upsert: true, new: true },
    );

    if (blockData && blockData.transactions) {
      for (const transaction of blockData.transactions) {
        const receipt = await this.blockchainService.getTransactionReceipt(
          transaction.transaction_hash,
        );

        const actual_fee = Number(receipt.actual_fee.amount);
        const l1GasPrice = Number(blockData.l1_gas_price.price_in_wei);
        const gasConsumed = actual_fee / l1GasPrice;

        const transactionData = {
          ...receipt,
          actual_fee,
          gasConsumed: gasConsumed.toString(),
          execution_status: receipt.execution_status,
          finality_status: receipt.finality_status,
          events: receipt.events,
          ...transaction,
        };

        await this.transactionModel.findOneAndUpdate(
          { blockNumber: transaction?.transaction_hash },
          transactionData,
          { upsert: true, new: true },
        );
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
    }, 300000); // 5 mins
  }
}
