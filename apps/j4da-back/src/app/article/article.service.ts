import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as fs from 'fs'
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import rake from 'rake-js'
import { AppService } from '../app/app.service'
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
    private readonly categoryService: CategoryService,
    private readonly appService: AppService
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

  async find(paginationQuery: PaginationDto, query): Promise<Article[]> {
    const { limit, skip, sort } = paginationQuery
    return await this.articleModel
      .find(query)
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
    const { catSlug, catId, subcatSlug } = await this.getCatSubcatSlug({
      article: articleDTO,
    })
    this.generateArticleFile({ article: articleDTO, catSlug, subcatSlug })

    this.generatCatSubcatFile({
      app: articleDTO.app,
      catSlug,
      catId,
      subcatSlug,
    })

    return newArticle.save()
  }

  async findByIdAndUpdate(
    _id: string,
    articleDTO: ArticleDTO
  ): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    const { catSlug: oldCatSlug, subcatSlug: oldSubcatSlug } =
      await this.getCatSubcatSlug({
        article,
      })
    const { catSlug, catId, subcatSlug } = await this.getCatSubcatSlug({
      article: articleDTO,
    })

    this.removeCatSubcatFile({
      app: article.app.toString(),
      catSlug: oldCatSlug,
      subcatSlug: oldSubcatSlug,
    })
    this.removeArticleFile({
      article,
      catSlug: oldCatSlug,
      subcatSlug: oldSubcatSlug,
    })
    this.generateArticleFile({ article: articleDTO, catSlug, subcatSlug })

    this.generatCatSubcatFile({
      app: articleDTO.app,
      catSlug,
      catId,
      subcatSlug,
    })
    if (articleDTO._id !== article._id) {
      this.generatCatSubcatFile({
        app: article.app,
        catSlug: oldCatSlug,
        catId,
        subcatSlug: oldSubcatSlug,
      })
    }

    return await this.articleModel.findByIdAndUpdate(_id, articleDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<Article> {
    const article = await this.articleModel.findById(_id)
    const { catSlug, subcatSlug } = await this.getCatSubcatSlug({ article })
    this.removeArticleFile({ article, catSlug, subcatSlug })
    this.removeCatSubcatFile({
      app: article.app,
      catSlug,
      subcatSlug,
    })
    await this.keywordService.findManyAndRemove(article.keywords.split(','))
    return await this.articleModel.findByIdAndRemove(_id)
  }

  async getCatSubCatPath({ app, catSlug, subcatSlug }) {
    const appData = await this.appService.findById(app)
    const dirPath = path.join(
      process.cwd(),
      '/apps/j4da-front/public/contents',
      appData.slug
    )

    const catPath = path.join(dirPath, catSlug)
    const subCatPath = path.join(dirPath, catSlug, subcatSlug)
    return {
      dirPath,
      catPath,
      subCatPath,
    }
  }
  generatCatSubcatFile = async ({ app, catId, catSlug, subcatSlug }) => {
    const { catPath, subCatPath } = await this.getCatSubCatPath({
      app,
      catSlug,
      subcatSlug,
    })

    const articlesByCat = await this.find({} as PaginationDto, {
      app: new mongoose.Types.ObjectId(app),
      catId,
    })
    const cat = path.join(catPath, 'byCat.json')
    const subcat = path.join(subCatPath, 'bySubCat.json')
    fs.writeFileSync(cat, JSON.stringify(articlesByCat, null, 2))
    const articlesBySubCat = articlesByCat.filter(
      (a) => a.subcategory === subcatSlug
    )
    fs.writeFileSync(subcat, JSON.stringify(articlesBySubCat, null, 2))
  }

  removeCatSubcatFile = async ({ app, catSlug, subcatSlug }) => {
    const { catPath, subCatPath } = await this.getCatSubCatPath({
      app,
      catSlug,
      subcatSlug,
    })

    const cat = path.join(catPath, 'byCat.json')
    const subcat = path.join(subCatPath, 'bySubCat.json')
    if (fs.existsSync(cat)) {
      fs.unlinkSync(cat)
    }
    if (fs.existsSync(subcat)) {
      fs.unlinkSync(subcat)
    }
    if (fs.existsSync(subCatPath) && !fs.readdirSync(subCatPath).length) {
      fs.rmSync(subCatPath, { recursive: true })
    }
    if (fs.existsSync(catPath) && !fs.readdirSync(catPath).length) {
      fs.rmSync(catPath, { recursive: true })
    }
  }

  generateArticleFile = async ({ article, catSlug, subcatSlug }) => {
    const filePath = await this.getFilePath(article, catSlug, subcatSlug)
    this.getBody({ article, catSlug, subcatSlug }).then((e) => {
      const dirname = path.dirname(filePath)
      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true })
      }
      fs.writeFileSync(filePath, e + article.body)
    })
  }

  removeArticleFile = async ({ article, catSlug, subcatSlug }) => {
    const filePath = await this.getFilePath(article, catSlug, subcatSlug)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  async getCatSubcatSlug({ article }) {
    const cat = await this.categoryService.findById(article.category)
    const subcat = cat.subcategories.find(
      (subcat) => subcat.slug === article.subcategory
    )
    return {
      catSlug: cat.slug,
      subcatSlug: subcat?.slug,
      catId: cat._id,
    }
  }

  async getFilePath(article, cat: string, subcat: string) {
    const app = await this.appService.findById(article.app)
    const dirPath = path.join(
      process.cwd(),
      '/apps/j4da-front/public/contents',
      app.slug
    )
    const filePath = path.join(dirPath, cat, subcat, `${article.slug}.md`)
    return filePath
  }

  getBody = async ({ article, catSlug, subcatSlug }) => {
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
${get('title', article?.title)}${get('category', catSlug)}${get(
      'subcategory',
      subcatSlug
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
