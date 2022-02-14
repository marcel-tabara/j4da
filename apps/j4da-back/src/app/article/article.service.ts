import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as fs from 'fs'
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import { AppService } from '../app/app.service'
import { CategoryService } from '../category/category.service'
import { KeywordService } from '../keyword/keyword.service'
import { SubcategoryService } from '../subcategory/subcategory.service'
import { ArticleDTO } from './dto/article.dto'
import { PaginationDto } from './dto/pagination.dto'
import { Article } from './interfaces/article.interface'
import path = require('path')

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    private readonly categoryService: CategoryService,
    private readonly keywordService: KeywordService,
    private readonly subcategoryService: SubcategoryService,
    private readonly appService: AppService
  ) {}

  find = async (paginationQuery: PaginationDto, query): Promise<Article[]> => {
    Logger.log(
      `ArticleService: Find articles ${JSON.stringify(query, null, 2)}`
    )
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
        select: '_id, title, slug',
        strictPopulate: false,
      })
      .populate({
        path: 'subcategory',
        select: '_id, title, slug',
        strictPopulate: false,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec()
  }

  findById = async (_id): Promise<Article> => {
    Logger.log(`ArticleService: findById ${_id}`)
    return await this.articleModel
      .findById(_id)
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .populate({
        path: 'category',
        select: '_id, slug',
        strictPopulate: false,
      })
      .populate({
        path: 'subcategory',
        select: '_id, slug',
        strictPopulate: false,
      })
      .exec()
  }

  create = async (articleDTO: ArticleDTO): Promise<Article> => {
    Logger.log(
      `ArticleService: Create article. ${JSON.stringify(articleDTO, null, 2)}`
    )
    const newArticle = await new this.articleModel(articleDTO).save()

    this.keywordService.insertMany({
      _id: newArticle._id,
      keywords: articleDTO.keywords,
    })
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

    return newArticle
  }

  findByIdAndUpdate = async (
    _id: string,
    articleDTO: ArticleDTO
  ): Promise<Article> => {
    Logger.log(`ArticleService: findByIdAndUpdate ${_id}`)
    const article = await this.articleModel.findById(_id)
    const { catSlug: oldCatSlug, subcatSlug: oldSubcatSlug } =
      await this.getCatSubcatSlug({
        article,
      })
    const { catSlug, catId, subcatSlug } = await this.getCatSubcatSlug({
      article: articleDTO,
    })

    // update keywords
    this.keywordService.remove({ article: _id })
    this.keywordService.insertMany({
      _id: _id,
      keywords: articleDTO.keywords,
    })

    // update files
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

  findByIdAndRemove = async (_id): Promise<Article> => {
    Logger.log(`ArticleService: findByIdAndRemove ${_id}`)
    const article = await this.articleModel.findById(_id)
    const { catSlug, subcatSlug } = await this.getCatSubcatSlug({ article })
    this.removeCatSubcatFile({
      app: article.app,
      catSlug,
      subcatSlug,
    })
    this.keywordService.remove({ article: _id })
    this.removeArticleFile({ article, catSlug, subcatSlug })

    return await this.articleModel.findByIdAndRemove(_id)
  }

  getCatSubCatPath = async ({ app, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: GetCatSubCatPath.`)
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
    Logger.log(`ArticleService: GeneratCatSubcatFile.`)
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
      (a) => a.subcategory.slug === subcatSlug
    )
    fs.writeFileSync(subcat, JSON.stringify(articlesBySubCat, null, 2))
  }

  removeCatSubcatFile = async ({ app, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: RemoveCatSubcatFile.`)
    const { catPath, subCatPath } = await this.getCatSubCatPath({
      app,
      catSlug,
      subcatSlug,
    })

    const cat = path.join(catPath, 'byCat.json')
    const subcat = path.join(subCatPath, 'bySubCat.json')
    fs.existsSync(cat) && fs.unlinkSync(cat)
    fs.existsSync(subcat) && fs.unlinkSync(subcat)

    await this.cleanDir(subCatPath)
    await this.cleanDir(catPath)
  }

  cleanDir = async (path) => {
    Logger.log(`ArticleService: Clean directory.`)
    if (fs.existsSync(path) && fs.readdirSync(path).length <= 1) {
      fs.rmSync(path, { recursive: true })
    }
  }

  generateArticleFile = async ({ article, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: GenerateArticleFile.`)
    const filePath = await this.getFilePath(article, catSlug, subcatSlug)
    await this.getBody({ article, catSlug, subcatSlug }).then((e) => {
      const dirname = path.dirname(filePath)
      !fs.existsSync(dirname) && fs.mkdirSync(dirname, { recursive: true })
      fs.writeFileSync(filePath, e)
    })
  }

  removeArticleFile = async ({ article, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: RemoveArticleFile.`)
    const filePath = await this.getFilePath(article, catSlug, subcatSlug)

    fs.existsSync(filePath) && fs.unlinkSync(filePath)
  }

  getCatSubcatSlug = async ({ article }) => {
    Logger.log(`ArticleService: GetCatSubcatSlug.`)
    const cat = await this.categoryService.findById(article.category)
    const subcat = await this.subcategoryService.findById(article.subcategory)

    return {
      catSlug: cat.slug,
      subcatSlug: subcat?.slug,
      catId: cat._id,
    }
  }

  getFilePath = async (article, cat: string, subcat: string) => {
    Logger.log(`ArticleService: GetFilePath.`)
    const app = await this.appService.findById(article.app)
    const dirPath = path.join(
      process.cwd(),
      '/apps/j4da-front/public/contents',
      app.slug
    )
    return path.join(dirPath, cat, subcat, `${article.slug}.md`)
  }

  getBody = async ({ article, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: GetBody.`)
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
      article?.keywords.map((e) => e.title)
    )}${get('slug', article?.slug)}${get('author', article?.authorName)}---

${article.body}
`
    return ''
  }
}
