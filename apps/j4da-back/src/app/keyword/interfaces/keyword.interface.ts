import { Document } from 'mongoose'

export interface Keyword extends Document {
  readonly title: string
  readonly article: string
  readonly articleLink: string
}
