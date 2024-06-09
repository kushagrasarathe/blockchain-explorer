import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { Model } from 'mongoose';
import { EthPrice } from '../models/eth-price.model';

@Injectable()
export class EthPriceService {
  private readonly logger = new Logger(EthPriceService.name);
  private readonly limiter: Bottleneck;

  constructor(
    @InjectModel(EthPrice.name) private ethPriceModel: Model<EthPrice>,
  ) {
    this.limiter = new Bottleneck({
      minTime: 60000, // 1 minute
      maxConcurrent: 1,
    });
  }

  async fetchAndStoreEthPrice() {
    try {
      const response = await this.limiter.schedule(() =>
        axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        ),
      );
      const priceUSD = response.data.ethereum.usd;
      await this.ethPriceModel.create({
        timestamp: Math.floor(Date.now() / 1000),
        priceUSD,
      });
    } catch (error) {
      this.logger.error('Failed to fetch ETH price', error);
    }
  }

  async getEthPriceAtTimestamp(timestamp: number): Promise<number> {
    const price = await this.ethPriceModel
      .findOne({ timestamp: { $lte: timestamp } })
      .sort({ timestamp: -1 });
    return price ? price.priceUSD : 0;
  }

  startPolling() {
    this.fetchAndStoreEthPrice(); // Fetch immediately
    setInterval(() => this.fetchAndStoreEthPrice(), 60000); // Then every minute
  }
}
