import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import rake from 'rake-js'
import { KeywordDTO } from './dto/keyword.dto'
import { Keyword } from './interfaces/keyword.interface'

@Injectable()
export class KeywordService {
  constructor(
    @InjectModel('Keyword') private readonly keywordModel: Model<Keyword>
  ) {}

  async extractKeywords({ _id, text }): Promise<Keyword[]> {
    Logger.log('ArticleService: Extrating keywords.')
    const extractedKeywords = rake(text, { language: 'english' })

    const keywords = await this.find({ keyword: { $in: extractedKeywords } })
    const keys = keywords.map((e) => e.title)

    const transformedExtractedKeywords = extractedKeywords
      .map((e) => {
        return {
          title: e,
          article: _id || '',
          articleLink: '',
        }
      })
      .filter((e) => !keys.includes(e.title))
    return keywords.concat(transformedExtractedKeywords)
  }

  async find(query): Promise<Keyword[]> {
    Logger.log(`KeywordService: Find keywords ${JSON.stringify(query)}.`)
    return await this.keywordModel.find(query).exec()
  }

  async findById(_id): Promise<Keyword> {
    Logger.log(`KeywordService: findById keyword ${_id}.`)
    return await this.keywordModel.findById(_id).exec()
  }

  async add(keywordDTO: KeywordDTO): Promise<Keyword> {
    Logger.log(`KeywordService: Add keyword.`)
    const newKeyword = await new this.keywordModel(keywordDTO)
    return newKeyword.save()
  }

  async findByIdAndUpdate(
    _id: string,
    keywordDTO: KeywordDTO
  ): Promise<Keyword> {
    Logger.log(`KeywordService: findByIdAndUpdate ${_id}.`)
    return await this.keywordModel.findByIdAndUpdate(_id, keywordDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    Logger.log(`KeywordService: findByIdAndRemove.`)
    return await this.keywordModel.findByIdAndRemove(_id)
  }

  async remove(query): Promise<Keyword[]> {
    Logger.log(`KeywordService: Remove keywords ${JSON.stringify(query)}.`)
    return await this.keywordModel.remove(query).exec()
  }

  async insertMany(keywords: Keyword[]): Promise<Keyword[]> {
    Logger.log(
      `KeywordService: insertMany keywords ${JSON.stringify(keywords)}.`
    )
    return await this.keywordModel.insertMany(keywords)
  }
}
