import { Document } from 'mongoose'
import { App } from '../../app/interfaces/app.interface'
import { Category } from '../../category/interfaces/category.interface'
import { Subcategory } from '../../subcategory/interfaces/subcategory.interface'

export interface Article extends Document {
  readonly _id?: string
  readonly keyOverride?: string
  readonly url: string
  readonly title: string
  readonly images: ReadonlyArray<string>
  readonly keywords: string
  readonly dateCreated: string
  readonly datePublished: string
  readonly dateModified?: string
  readonly authorName: string
  readonly description: string
  readonly body: string
  readonly publisherName: string
  readonly publisherLogo: string
  readonly slug: string
  readonly category: Category
  readonly subcategory: Subcategory
  readonly app: App
  readonly priority: number
}
