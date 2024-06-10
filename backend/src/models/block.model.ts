import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Block extends Document {
  @Prop({ required: true, unique: true })
  blockNumber: number;

  @Prop({ required: true })
  timestamp: number;

  // @Prop({ required: false, type: Object })
  // execution_resources: ExecutionResources;

  // @Prop({ type: [{ type: Object }] })
  // transactions: Transaction[];

  @Prop({ required: false, type: Object })
  l1_gas_price: { price_in_fri: string; price_in_wei: string };
}

export const BlockSchema = SchemaFactory.createForClass(Block);
