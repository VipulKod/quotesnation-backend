import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from '../interface/quote.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel('Quote') private readonly quotesModel: Model<Quote>,
  ) {}

  async create(quote: string, author: string): Promise<Quote> {
    const id = uuidv4(); // generate a unique ID
    const newQuote = new this.quotesModel({
      quoteId: id,
      quote,
      author,
      timestamp: new Date(),
    });
    return await newQuote.save();
  }

  async findAll(): Promise<Quote[]> {
    return await this.quotesModel.find().exec();
  }

  async findOne(id: string): Promise<Quote> {
    const quote = await this.quotesModel.findById({ quoteId: id }).exec();
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return quote;
  }

  async update(id: string, quote: string, author: string): Promise<Quote> {
    const quoteToUpdate = await this.quotesModel
      .findOne({
        quoteId: id,
      })
      .exec();
    if (quote) {
      quoteToUpdate.quote = quote;
    }
    if (author) {
      quoteToUpdate.author = author;
    }
    return await quoteToUpdate.save();
  }

  async delete(id: string): Promise<void> {
    const quoteToDelete = await this.quotesModel
      .findByIdAndDelete({
        quoteId: id,
      })
      .exec();
    if (!quoteToDelete) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    await quoteToDelete;
  }
}
