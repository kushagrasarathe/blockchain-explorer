import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../models/transaction.model';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  @Get()
  async getLatestTransactions(
    @Query('type') type?: string,
    @Query('page') page = 1,
  ) {
    const query = type ? { type } : {};
    const transactions = await this.transactionModel
      .find(query)
      .sort({ blockNumber: -1, timestamp: -1 })
      .skip((page - 1) * 20)
      .limit(20);

    return transactions;
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    const transaction = await this.transactionModel.findOne({
      transactionHash: id,
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }
}
