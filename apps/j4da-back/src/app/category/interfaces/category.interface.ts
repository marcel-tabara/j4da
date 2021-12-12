import { Document } from 'mongoose'

export interface Category extends Document {
  readonly title: string
  readonly description: string
  readonly subcategories: [
    {
      readonly title: string
      readonly description: string
      readonly app: string
    }
  ]
}
