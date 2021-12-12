import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ArticleDTO } from './dto/article.dto'
import { PaginationDto } from './dto/pagination.dto'
import { Article } from './interfaces/article.interface'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>
  ) {}

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
