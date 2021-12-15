import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { KeywordDTO } from './dto/keyword.dto'
import { Keyword } from './interfaces/keyword.interface'

@Injectable()
export class KeywordService {
  constructor(
    @InjectModel('Keyword') private readonly keywordModel: Model<Keyword>
  ) {}

  async find(): Promise<Keyword[]> {
    const keywords = await this.keywordModel.find().exec()
    return keywords
  }

  async findById(_id): Promise<Keyword> {
    const keyword = await this.keywordModel.findById(_id).exec()
    return keyword
  }

  async add(keywordDTO: KeywordDTO): Promise<Keyword> {
    const newKeyword = await new this.keywordModel(keywordDTO)
    return newKeyword.save()
  }

  async findByIdAndUpdate(
    _id: string,
    keywordDTO: KeywordDTO
  ): Promise<Keyword> {
    const editedKeyword = await this.keywordModel.findByIdAndUpdate(
      _id,
      keywordDTO,
      { new: true }
    )
    return editedKeyword
  }

  async findManyAndUpdate(keywords: string[]): Promise<string> {
    try {
      await this.keywordModel.bulkWrite(
        keywords.map((keyword) => ({
          updateOne: {
            filter: { title: keyword },
            update: { $inc: { count: 1 } },
            upsert: true,
          },
        }))
      )
    } catch (error) {
      return error.message
    }

    return 'success'
  }

  async findManyAndRemove(keywords: string[]): Promise<string> {
    try {
      await this.keywordModel.bulkWrite(
        keywords.map((keyword) => ({
          updateOne: {
            filter: { title: keyword },
            update: { $inc: { count: -1 } },
            upsert: false,
          },
        }))
      )
      await this.keywordModel.bulkWrite(
        keywords.map((keyword) => ({
          deleteOne: {
            filter: { title: keyword, count: { $lte: 0 } },
            upsert: true,
          },
        }))
      )
    } catch (error) {
      return error.message
    }

    return 'success'
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    const deletedKeyword = await this.keywordModel.findByIdAndRemove(_id)
    return deletedKeyword
  }
}
