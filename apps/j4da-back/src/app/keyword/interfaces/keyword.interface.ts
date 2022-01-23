import { Document } from 'mongoose'
import { Article } from '../../article/interfaces/article.interface'

export interface Keyword extends Document {
  readonly title: string
  readonly article: Article
  readonly articleLink: Article
}
