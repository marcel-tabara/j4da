import { Document } from 'mongoose'

export interface Keyword extends Document {
  readonly title: string
  readonly description: string
  readonly count: number
}
