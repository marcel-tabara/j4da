import { Document } from 'mongoose'

export interface ArticlesKeywords extends Document {
  readonly keyword: string
  readonly url: string
  readonly slug: string
  readonly category: string
  readonly subcategory: string
  readonly priority: number
  readonly _id: string
}
