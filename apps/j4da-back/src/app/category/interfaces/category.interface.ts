import { Document } from 'mongoose'

export interface Category extends Document {
  readonly title: string
  readonly slug: string
  readonly description: string
  readonly app: string
  readonly subcategories: [
    {
      readonly title: string
      readonly slug: string
      readonly description: string
    }
  ]
}
