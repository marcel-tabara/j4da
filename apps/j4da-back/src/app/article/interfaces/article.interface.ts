import { Document } from 'mongoose'

export interface Article extends Document {
  readonly total: number
  readonly skip: number
  readonly limit: number
  readonly articles: [
    {
      readonly title: string
      readonly description: string
      readonly body: string
      readonly author: string
      readonly date_posted: string
    }
  ]
}
