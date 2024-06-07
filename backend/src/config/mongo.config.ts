import * as dotenv from 'dotenv';

dotenv.config();

export const mongoConfig = {
  uri: process.env.MONGO_URI,
};
