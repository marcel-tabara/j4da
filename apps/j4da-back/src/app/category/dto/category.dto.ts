export class CategoryDTO {
  readonly title: string
  readonly description: string
  readonly subcategories: [
    {
      readonly title: string
      readonly description: string
    }
  ]
}
