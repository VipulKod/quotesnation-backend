import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Quote } from '../interface/quote.interface';
import { QuotesService } from '../services/quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quoteService: QuotesService) {}

  @Get()
  findAll(): Promise<Quote[]> {
    return this.quoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quote> {
    return this.quoteService.findOne(id);
  }

  @Post()
  create(
    @Body('quote') quote: string,
    @Body('author') author: string,
  ): Promise<Quote> {
    return this.quoteService.create(quote, author);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('quote') quote: string,
    @Body('author') author: string,
  ): Promise<Quote> {
    return this.quoteService.update(id, quote, author);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.quoteService.delete(id);
  }
}