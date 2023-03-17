import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { cors } from 'src/middleware/cors.middleware';
import { Quote } from '../interface/quote.interface';
import { QuotesService } from '../services/quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quoteService: QuotesService) {}

  @UseInterceptors(cors)
  @Get()
  findNext(
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<any> {
    return this.quoteService.getNextQuotes(offset, limit);
  }

  @UseInterceptors(cors)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quote> {
    return this.quoteService.findOne(id);
  }

  @UseInterceptors(cors)
  @Post()
  create(
    @Body('quote') quote: string,
    @Body('author') author: string,
  ): Promise<Quote> {
    return this.quoteService.create(quote, author);
  }

  @UseInterceptors(cors)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('quote') quote: string,
    @Body('author') author: string,
  ): Promise<Quote> {
    return this.quoteService.update(id, quote, author);
  }

  @UseInterceptors(cors)
  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.quoteService.delete(id);
  }
}
