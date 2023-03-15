import * as mongoose from 'mongoose';

export const QuoteSchema = new mongoose.Schema({
  quoteId: String,
  quote: String,
  author: { type: String, ref: 'User' },
  date: Date,
});
