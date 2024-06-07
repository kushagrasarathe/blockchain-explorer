import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true, unique: true })
  transactionHash: string;

  @Prop({ required: true })
  blockNumber: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  timestamp: number;

  @Prop()
  senderAddress: string;

  @Prop()
  actualFee: number;

  @Prop()
  maxFee: number;

  @Prop()
  gasConsumed: number;

  @Prop()
  version: number;

  @Prop()
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
