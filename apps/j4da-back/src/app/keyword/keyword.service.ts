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
    keywordDTO: KeywordDTO & { _id: string }
  ): Promise<Keyword> {
    const editedKeyword = await this.keywordModel.findByIdAndUpdate(
      keywordDTO._id,
      keywordDTO,
      { new: true }
    )
    return editedKeyword
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    const deletedKeyword = await this.keywordModel.findByIdAndRemove(_id)
    return deletedKeyword
  }
}
