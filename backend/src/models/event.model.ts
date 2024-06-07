import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true })
  blockNumber: number;

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  keys: string[];

  @Prop({ required: true })
  data: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
