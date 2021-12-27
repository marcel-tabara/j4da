import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform, Type } from 'class-transformer'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'
import { App } from '../../app/schemas/app.schema'

export type CategoryDocument = Category & Document

@Schema()
class Subcategory {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string

  @Prop()
  description: string
}

@Schema()
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: App.name })
  @Type(() => App)
  app: App

  @Prop()
  subcategories: Subcategory[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
