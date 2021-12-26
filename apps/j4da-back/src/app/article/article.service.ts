import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as fs from 'fs'
import { Model } from 'mongoose'
import rake from 'rake-js'
import { KeywordService } from '../keyword/keyword.service'
import { ArticleDTO } from './dto/article.dto'
import { PaginationDto } from './dto/pagination.dto'
import { ArticlesKeywords } from './interfaces/article-keywords.interface'
import { Article } from './interfaces/article.interface'
import path = require('path')

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    private readonly keywordService: KeywordService
  ) {}

  async findArticlesKeywords(): Promise<ArticlesKeywords[]> {
    const articles = await this.articleModel.find().exec()
    const articleKeywords = (articles || [])
      .map((article: Article) =>
        (article.keywords || '').split(',').map((keyword) => {
          return {
            keyword,
            category: article.category,
            subcategory: article.subcategory,
            slug: article.slug,
            url: article.url,
            priority: article.priority,
            _id: article._id,
          }
        })
      )
      .reduce((a, b) => a.concat(b))

    return articleKeywords as ArticlesKeywords[]
  }

  async extractKeywords(article: string): Promise<string[]> {
    return rake(article, { language: 'english' })
  }

  async find(paginationQuery: PaginationDto): Promise<Article[]> {
    const { limit, skip, sort } = paginationQuery
    return await this.articleModel
      .find()
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async findById(_id): Promise<Article> {
    return await this.articleModel.findById(_id).exec()
  }

  async create(articleDTO: ArticleDTO): Promise<Article> {
    const newArticle = await new this.articleModel(articleDTO)
    generatFile(articleDTO)
    return newArticle.save()
  }

  async findByIdAndUpdate(
    _id: string,
    articleDTO: ArticleDTO
  ): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    removeFile(article)
    generatFile(articleDTO)
    return await this.articleModel.findByIdAndUpdate(_id, articleDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    removeFile(article)
    await this.keywordService.findManyAndRemove(article.keywords.split(','))
    return await this.articleModel.findByIdAndRemove(_id)
  }
}

const generatFile = (article: ArticleDTO) => {
  const filePath = getFilePath(article)
  fs.appendFileSync(filePath, getBody(article) + article.body)
}

const removeFile = (article: ArticleDTO) => {
  const filePath = getFilePath(article)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

const getFilePath = (article: ArticleDTO) => {
  const dirPath = path.join(process.cwd(), '/apps/j4da-front/public/')
  const filePath = dirPath + article.slug + '.md'
  return filePath
}

const getBody = (article: ArticleDTO) => {
  return `
---
title: ${article.title}
description:  ${article.description}
date:  ${article.dateCreated}
modified_date: ${article.dateModified}
image:  ${article.images}
---

`
}
