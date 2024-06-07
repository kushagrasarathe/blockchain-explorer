import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EthPrice extends Document {
  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  priceUSD: number;
}

export const EthPriceSchema = SchemaFactory.createForClass(EthPrice);
