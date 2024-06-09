import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExecutionResources, TransactionType } from 'src/types';

// interface ExecutionResources {
//   steps: number;
//   memory_holes: number;
//   range_check_builtin_applications: number;
//   pedersen_builtin_applications: number;
//   poseidon_builtin_applications: number;
//   ec_op_builtin_applications: number;
//   ecdsa_builtin_applications: number;
//   bitwise_builtin_applications: number;
//   keccak_builtin_applications: number;
// }

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true, unique: true })
  transactionHash: string;

  @Prop()
  actual_fee: number;

  @Prop()
  gasConsumed: string;

  @Prop({ required: true })
  type: TransactionType;

  @Prop()
  execution_status: string;

  @Prop()
  finality_status: string;

  @Prop({ required: true })
  block_hash: number;

  @Prop({ required: true })
  block_number: number;

  @Prop({ type: Object })
  execution_resources: ExecutionResources;

  @Prop({ required: true })
  timestamp: number;

  @Prop()
  senderAddress: string;

  @Prop()
  maxFee: number;

  @Prop()
  version: number;

  @Prop([String])
  calldata: string[];

  @Prop([String])
  signature: string[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

//
//
//
//
//
//
// messages_sent
// events
