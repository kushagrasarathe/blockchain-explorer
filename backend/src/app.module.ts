import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongo.config';
import { TransactionsController } from './controllers/transactions.controller';
import { Block, BlockSchema } from './models/block.model';
import { Event, EventSchema } from './models/event.model';
import { Transaction, TransactionSchema } from './models/transaction.model';
import { BlockchainService } from './services/blockchain.service';
import { DataSyncService } from './services/data-sync.service';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri),
    MongooseModule.forFeature([
      { name: Block.name, schema: BlockSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [BlockchainService, DataSyncService],
})
export class AppModule {
  constructor(private dataSyncService: DataSyncService) {}

  async onModuleInit() {
    await this.dataSyncService.syncInitialData();
    this.dataSyncService.startPolling();
  }
}
