import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../models/event.model';

@Controller('events')
export class EventsController {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  @Get('/transaction/:txHash')
  async getEventsByTransaction(@Param('txHash') txHash: string) {
    return this.eventModel.find({ transactionHash: txHash }).sort({ index: 1 });
  }
}
