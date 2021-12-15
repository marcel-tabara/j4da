import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ArticleDTO } from './dto/article.dto'
import { PaginationDto } from './dto/pagination.dto'
import { ArticlesKeywords } from './interfaces/article-keywords.interface'
import { Article } from './interfaces/article.interface'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>
  ) {}

  async findArticlesKeywords(): Promise<ArticlesKeywords[]> {
    const articles = await this.articleModel.find().exec()
    const articlesKeywords = articles
      .map((article: Article) => {
        return article.keywords.split(',').map((e) => {
          return {
            keyword: e,
            category: article.category,
            subcategory: article.subcategory,
            slug: article.slug,
            url: article._id,
            priority: article.priority,
          }
        })
      })
      .reduce((a, b) => a.concat(b))

    return articlesKeywords as ArticlesKeywords[]
  }

  async find(paginationQuery: PaginationDto): Promise<Article[]> {
    const { limit, skip, sort } = paginationQuery
    const articles = await this.articleModel
      .find()
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec()

    return articles
  }

  async findById(_id): Promise<Article> {
    const article = await this.articleModel.findById(_id).exec()
    return article
  }

  async create(articleDTO: ArticleDTO): Promise<Article> {
    const newArticle = await new this.articleModel(articleDTO)
    return newArticle.save()
  }

  async findByIdAndUpdate(
    _id: string,
    articleDTO: ArticleDTO
  ): Promise<Article> {
    const editedArticle = await this.articleModel.findByIdAndUpdate(
      _id,
      articleDTO,
      { new: true }
    )
    return editedArticle
  }

  async findByIdAndRemove(_id): Promise<Article> {
    const deletedArticle = await this.articleModel.findByIdAndRemove(_id)
    return deletedArticle
  }
}
