import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventData } from 'src/types';
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

  // async syncInitialData() {
  //   const latestBlock = await this.blockchainService.getLatestBlockNumber();

  //   for (
  //     let blockNumber = latestBlock - 10;
  //     blockNumber <= latestBlock;
  //     blockNumber++
  //   ) {
  //     await this.syncBlock(blockNumber);
  //   }
  // }

  async syncInitialData() {
    const latestBlock = await this.blockchainService.getLatestBlockNumber();
    await this.syncBlock(latestBlock);
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
      // for (const tx of blockData.transactions) {
      for (const [index, tx] of blockData.transactions.entries()) {
        const receipt = await this.blockchainService.getTransactionReceipt(
          tx.transaction_hash,
        );

        await this.transactionModel.findOneAndUpdate(
          { transactionHash: tx.transaction_hash },
          {
            blockNumber: receipt.block_number,
            transactionHash: tx.transaction_hash,
            type: tx.type,
            version: tx.version,
            nonce: tx.nonce,
            max_fee: tx.max_fee,
            sender_address: tx.sender_address,
            signature: tx.signature,
            calldata: tx.calldata,
            execution_resources: receipt.execution_resources,
            events: receipt.events,
            unix_timestamp: blockData.timestamp,
            timestamp: blockData.timestamp,
            position: tx.position,
          },
          { upsert: true, new: true },
        );

        await this.syncTransaction(tx, blockData, index);
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

  async syncTransaction(tx: any, blockData: any, txIndex: number) {
    const receipt = await this.blockchainService.getTransactionReceipt(
      tx.transaction_hash,
    );

    const actual_fee = parseInt(receipt.actual_fee.amount, 16);
    const l1GasPrice = parseInt(blockData.l1_gas_price.price_in_wei, 16);
    const gasConsumed = actual_fee / l1GasPrice;

    const events = receipt.events.reduce((acc, event, index) => {
      return [
        ...acc,
        {
          id: `${receipt.block_number}_${txIndex}_${index}`,
          timeStamp: blockData.timestamp,
          blockNumber: receipt.block_number,
        },
      ];
    }, [] as EventData[]);

    await this.transactionModel.findOneAndUpdate(
      { transactionHash: tx.transaction_hash },
      {
        transactionHash: receipt.transaction_hash,
        blockNumber: receipt.block_number,
        // transactionHash: receipt.transaction_hash,
        type: receipt.type,
        version: tx.version,
        nonce: tx.nonce,
        max_fee: tx.max_fee,
        sender_address: tx.sender_address,
        signature: tx.signature,
        calldata: tx.calldata,
        execution_resources: receipt.execution_resources,
        // events: receipt.events,
        events,
        unix_timestamp: blockData.timestamp,
        timestamp: blockData.timestamp,
        position: tx.transaction_index,

        actual_fee,
        gasConsumed: gasConsumed,
      },
      { upsert: true, new: true },
    );
  }
}
