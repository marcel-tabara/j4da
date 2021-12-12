import * as mongoose from 'mongoose'

export const AppSchema = new mongoose.Schema({
  keyOverride: String,
  url: String,
  title: String,
  images: [String],
  section: String,
  keywords: String,
  dateCreated: String,
  datePublished: String,
  dateModified: String,
  authorName: [String],
  description: String,
  body: String,
  publisherName: String,
  publisherLogo: String,
})