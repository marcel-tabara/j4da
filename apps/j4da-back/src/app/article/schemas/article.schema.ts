import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform, Type } from 'class-transformer'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'
import { App } from '../../app/schemas/app.schema'
import { Category } from '../../category/schemas/category.schema'

export type ArticleDocument = Article & Document

@Schema()
export class Article {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  keyOverride: string
  @Prop()
  url: string
  @Prop()
  title: string
  @Prop()
  images: [string]
  @Prop()
  keywords: string
  @Prop()
  dateCreated: string
  @Prop()
  datePublished: string
  @Prop()
  dateModified: string
  @Prop()
  authorName: string
  @Prop()
  description: string
  @Prop()
  body: string
  @Prop()
  publisherName: string
  @Prop()
  publisherLogo: string
  @Prop()
  slug: string
  @Prop()
  subcategory: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category: Category

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: App.name })
  @Type(() => App)
  app: App
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
