import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface ExecutionResources {
  steps: number;
  memory_holes: number;
  range_check_builtin_applications: number;
  pedersen_builtin_applications: number;
  poseidon_builtin_applications: number;
  ec_op_builtin_applications: number;
  ecdsa_builtin_applications: number;
  bitwise_builtin_applications: number;
  keccak_builtin_applications: number;
}

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

  @Prop()
  l1GasPrice: string;

  @Prop({ type: Object })
  executionResources: ExecutionResources;

  @Prop([String])
  calldata: string[];

  @Prop([String])
  signature: string[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
