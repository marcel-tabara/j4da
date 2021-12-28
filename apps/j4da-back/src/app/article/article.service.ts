import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as fs from 'fs'
import { Model } from 'mongoose'
import rake from 'rake-js'
import { CategoryService } from '../category/category.service'
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
    private readonly keywordService: KeywordService,
    private readonly categoryService: CategoryService
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
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .populate({
        path: 'category',
        select: '_id, title',
        strictPopulate: false,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async findById(_id): Promise<Article> {
    return await this.articleModel
      .findById(_id)
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .populate({
        path: 'category',
        select: '_id, title',
        strictPopulate: false,
      })
      .exec()
  }

  async create(articleDTO: ArticleDTO): Promise<Article> {
    const newArticle = await new this.articleModel(articleDTO)
    this.generatFile(articleDTO)
    return newArticle.save()
  }

  async findByIdAndUpdate(
    _id: string,
    articleDTO: ArticleDTO
  ): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    this.removeFile(article)
    this.generatFile(articleDTO)
    return await this.articleModel.findByIdAndUpdate(_id, articleDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    this.removeFile(article)
    await this.keywordService.findManyAndRemove(article.keywords.split(','))
    return await this.articleModel.findByIdAndRemove(_id)
  }

  generatFile = (article: ArticleDTO) => {
    const filePath = this.getFilePath(article)
    this.getBody(article).then((e) =>
      fs.appendFileSync(filePath, e + article.body)
    )
  }

  removeFile = (article: ArticleDTO) => {
    const filePath = this.getFilePath(article)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  getFilePath = (article: ArticleDTO) => {
    const dirPath = path.join(process.cwd(), '/apps/j4da-front/public/')
    const filePath = dirPath + article.slug + '.md'
    return filePath
  }

  getBody = async (article: ArticleDTO) => {
    const cat = await this.categoryService.findById(article.category)
    return `---
title: ${article?.title}
category: ${cat.title}
subcategory: ${article.subcategory}
description:  ${article?.description}
date:  ${article?.dateCreated}
modified_date: ${article?.dateModified}
image:  ${article?.images}
tags: ${article?.keywords}
---

`
  }
}
