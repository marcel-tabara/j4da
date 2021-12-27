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
  @Prop()
  description: string
  @Prop()
  count: number
}
export const KeywordSchema = SchemaFactory.createForClass(Keyword)
