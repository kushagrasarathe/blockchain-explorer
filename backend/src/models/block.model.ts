import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Block extends Document {
  @Prop({ required: true, unique: true })
  blockNumber: number;

  @Prop({ required: true })
  timestamp: number;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
