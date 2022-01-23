import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'
import { Document, ObjectId } from 'mongoose'

export type KeywordDocument = Keyword & Document

@Schema()
export class Keyword {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string
  article: string
  articleLink: string

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Article.name })
  // @Type(() => Article)
  // article: Article

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Article.name })
  // @Type(() => Article)
  // articleLink: Article
}
export const KeywordSchema = SchemaFactory.createForClass(Keyword)
