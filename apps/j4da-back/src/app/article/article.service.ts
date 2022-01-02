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
    const { cat, subcat } = await this.getCatSubcatSlug({ article: articleDTO })
    this.generatFile({ article: articleDTO, cat, subcat })
    return newArticle.save()
  }

  async findByIdAndUpdate(
    _id: string,
    articleDTO: ArticleDTO
  ): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    const { cat, subcat } = await this.getCatSubcatSlug({ article: articleDTO })
    this.removeFile({ article, cat, subcat })
    this.generatFile({ article: articleDTO, cat, subcat })
    return await this.articleModel.findByIdAndUpdate(_id, articleDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    const { cat, subcat } = await this.getCatSubcatSlug({ article })
    this.removeFile({ article, cat, subcat })
    await this.keywordService.findManyAndRemove(article.keywords.split(','))
    return await this.articleModel.findByIdAndRemove(_id)
  }

  generatFile = ({ article, cat, subcat }) => {
    const filePath = this.getFilePath(article.slug, cat, subcat)
    this.getBody(article).then((e) => {
      const dirname = path.dirname(filePath)
      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true })
      }
      fs.appendFileSync(filePath, e + article.body)
    })
  }

  removeFile = ({ article, cat, subcat }) => {
    const filePath = this.getFilePath(article.slug, cat, subcat)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  async getCatSubcatSlug({ article }) {
    const cat = await this.categoryService.findById(article.category)
    const subcat = cat.subcategories.find(
      (subcat) => subcat.title === article.subcategory
    )
    return { cat: cat.slug, subcat: subcat.slug }
  }

  getFilePath = (articleSlug: string, cat: string, subcat: string) => {
    const dirPath = path.join(process.cwd(), '/apps/j4da-front/public/')
    const filePath = path.join(dirPath, cat, subcat, `${articleSlug}.md`)
    return filePath
  }

  getBody = async ({ article, cat, subcat }) => {
    const getValue = (value: string | string[]) => {
      if (Array.isArray(value)) {
        return value.map((e) => `  - ${e}`).join('\n')
      } else {
        return value
      }
    }
    const get = (type: string, value: string | string[]) => {
      const isArray = (value: string | string[]) =>
        Array.isArray(value) ? `\n` : ' '
      return value && `${type}:${isArray(value)}${getValue(value)}\n`
    }
    return `---
${get('title', article?.title)}${get('category', cat)}${get(
      'subcategory',
      subcat
    )}${get('description', article?.description)}${get(
      'date',
      article?.dateCreated
    )}${get('image', article?.images as string[])}${get(
      'tags',
      article?.keywords.split(',')
    )}${get('slug', article?.slug)}${get('author', article?.authorName)}
---

`
  }
}
