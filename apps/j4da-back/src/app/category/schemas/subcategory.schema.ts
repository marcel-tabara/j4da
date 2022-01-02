import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'
import { Document, ObjectId } from 'mongoose'

export type SubcategoryDocument = Subcategory & Document

@Schema()
export class Subcategory {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string

  @Prop()
  slug: string

  @Prop()
  description: string
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory)
