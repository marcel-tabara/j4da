import { Category } from '../../category/interfaces/category.interface'
import { Subcategory } from '../../subcategory/interfaces/subcategory.interface'

export class ArticlesKeywordsDTO {
  readonly keyword: string
  readonly url: string
  readonly slug: string
  readonly category: Category
  readonly subcategory: Subcategory
  readonly priority: number
  readonly _id: string
}
