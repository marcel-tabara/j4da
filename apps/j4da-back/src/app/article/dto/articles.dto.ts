export class ArticleDTO {
  readonly total: number
  readonly skip: number
  readonly limit: number
  readonly data: [
    {
      readonly title: string
      readonly description: string
      readonly body: string
      readonly author: string
      readonly date: string
      readonly slug: string
      readonly image: string
    }
  ]
}
