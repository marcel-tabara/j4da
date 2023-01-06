import { Document } from 'mongoose'

export interface KeywordShort extends Document {
  readonly title: string
  readonly article: string
  readonly articleLink: string
}
