import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventData, ExecutionResources, TransactionType } from 'src/types';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true, unique: true })
  transactionHash: string;

  @Prop({ required: true })
  blockNumber: number;

  @Prop({ required: true })
  type: TransactionType;

  @Prop({ required: false, type: [String] })
  calldata: string[];

  @Prop({ required: false })
  actual_fee: string;

  @Prop({ required: false, type: Object })
  execution_resources: ExecutionResources;

  @Prop({ type: [Object] })
  events: EventData[];

  @Prop({ required: false })
  sender_address: string;

  @Prop({ required: false })
  unix_timestamp: number;

  @Prop({ required: false })
  timestamp: number;

  @Prop({ required: false })
  nonce: string;

  @Prop({ required: false })
  position: number;

  @Prop({ required: false })
  version: number;

  @Prop({ required: false })
  signature: string[];

  @Prop({ required: false })
  max_fee: string;

  @Prop({ required: false })
  gasConsumed: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
