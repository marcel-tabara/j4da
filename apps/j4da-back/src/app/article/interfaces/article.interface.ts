import { Document } from 'mongoose'

export interface Article extends Document {
  readonly title: string
  readonly description: string
  readonly body: string
  readonly author: string
  readonly date: string
  readonly slug: string
  readonly image: string
}
