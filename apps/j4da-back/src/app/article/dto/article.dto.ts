export class ArticleDTO {
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
  readonly category: string
  readonly subcategory: string
  readonly app: string
}
