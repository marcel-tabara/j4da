import { SubcategoryDTO } from './subcategory.dto'

export class CategoryDTO {
  readonly title: string
  readonly slug: string
  readonly description: string
  readonly app: string
  readonly subcategories: SubcategoryDTO[]
}
