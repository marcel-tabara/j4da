import * as mongoose from 'mongoose'

export const KeywordSchema = new mongoose.Schema({
  title: String,
  description: String,
  count: Number,
})
