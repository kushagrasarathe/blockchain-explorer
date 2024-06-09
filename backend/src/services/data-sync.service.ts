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
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private blockchainService: BlockchainService,
  ) {}

  async syncInitialData() {
    const latestBlock = await this.blockchainService.getLatestBlockNumber();
    // const startBlock = Math.max(0, latestBlock - 10);
    // console.log('startBlock', startBlock);

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
            transaction_hash: tx.transaction_hash,
            type: tx.type,
            version: tx.version,
            nonce: tx.nonce,
            max_fee: tx.max_fee,
            sender_address: tx.sender_address,
            signature: tx.signature,
            calldata: tx.calldata,
            blockNumber: blockData?.block_number,
            timestamp: blockData?.timestamp,
          },
          { upsert: true, new: true },
        );

        // // If it's an INVOKE transaction, fetch and save more details
        // if (
        //   tx.type === ('INVOKE' as TransactionType) &&
        //   tx.version === ('0x1' as any)
        // ) {
        //   // Fetch and save additional details
        // }
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

  async syncTransaction(tx: any, blockData: any) {
    const txModel = await this.transactionModel.findOneAndUpdate(
      { transactionHash: tx.transaction_hash },
      {
        blockNumber: blockData.block_number,
        timestamp: blockData.timestamp,
        maxFee: tx.max_fee,
        senderAddress: tx.contract_address,
        nonce: tx.nonce,
        type: tx.type,
        version: tx.version,
        calldata: tx.calldata,
        signature: tx.signature,
      },
      { upsert: true, new: true },
    );

    if (tx.type === 'INVOKE' && tx.version === 1) {
      const receipt = await this.blockchainService.getTransactionReceipt(
        tx.transaction_hash,
      );
      const actual_fee = receipt.actual_fee;
      const l1GasPrice = blockData.l1_gas_price;
      const gasConsumed = Number(actual_fee.amount) / l1GasPrice;

      await txModel.updateOne({
        actual_fee,
        gasConsumed: gasConsumed.toString(),
        type: receipt.type,
        transactionHash: receipt.transaction_hash,
        execution_status: receipt.execution_status,
        finality_status: receipt.finality_status,
        block_hash: receipt.block_hash,
        block_number: receipt.block_number,
        messages_sent: receipt.messages_sent,
        events: receipt.events,
        execution_resources: receipt.execution_resources,
      });

      await this.syncEvents(tx.transaction_hash, blockData.block_number);
    }
  }

  async syncEvents(txHash: string, blockNumber: number) {
    const receipt = await this.blockchainService.getTransactionReceipt(txHash);
    for (const [index, event] of receipt.events.entries()) {
      await this.eventModel.create({
        transactionHash: txHash,
        blockNumber,
        index,
        keys: event.keys,
        data: event.data,
      });
    }
  }
}
