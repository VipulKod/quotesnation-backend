import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesController } from './controller/quotes.controller';
import { QuoteSchema } from './schema/quote.schema';
import { QuotesService } from './services/quotes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
