import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { EthPriceService } from 'src/services/eth-price.service';
import { Transaction } from '../models/transaction.model';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private ethPriceService: EthPriceService,
  ) {}

  @Get()
  async getLatestTransactions(
    @Query(new ValidationPipe()) query: PaginatedQueryDto,
  ) {
    const { page = 1, size = 10, type } = query;

    const filter = type ? { type } : {};

    const transactions = await this.transactionModel
      .find(filter)
      .sort({ blockNumber: -1, timestamp: -1 })
      .skip((page - 1) * size)
      .limit(size);

    return transactions;
  }

  @Get(':id')
  async getTransaction(
    @Param('id') id: string,
  ): Promise<{ actualFeeUSD: string } & Transaction> {
    const transaction = await this.transactionModel.findOne({
      transactionHash: id,
    });
    if (!transaction) throw new NotFoundException('Transaction not found');

    const ethPrice = await this.ethPriceService.getEthPriceAtTimestamp(
      transaction.timestamp,
    );
    const actualFeeUSD =
      (Number(transaction.actual_fee || 0) * Number(ethPrice)) / Number(1e18);

    return { ...transaction.toJSON(), actualFeeUSD: actualFeeUSD.toString() };
  }
}
