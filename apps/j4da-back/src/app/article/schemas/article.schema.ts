import * as mongoose from 'mongoose'

export const ArticleSchema = new mongoose.Schema({
  keyOverride: String,
  url: String,
  title: String,
  images: [String],
  keywords: String,
  dateCreated: String,
  datePublished: String,
  dateModified: String,
  authorName: [String],
  description: String,
  body: String,
  publisherName: String,
  publisherLogo: String,
  slug: String,
  category: String,
  subcategory: String,
  app: String,
})
