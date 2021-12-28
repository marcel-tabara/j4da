import { Document } from 'mongoose'
import { Category } from '../../category/interfaces/category.interface'

export interface ArticlesKeywords extends Document {
  readonly keyword: string
  readonly url: string
  readonly slug: string
  readonly category: Category
  readonly subcategory: string
  readonly priority: number
  readonly _id: string
}
