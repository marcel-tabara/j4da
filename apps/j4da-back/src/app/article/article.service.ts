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
      .skip(2)
      .limit(limit)
      .exec()

    return articles
  }

  async findById(articleID): Promise<Article> {
    const article = await this.articleModel.findById(articleID).exec()
    return article
  }

  async create(articleDTO: ArticleDTO): Promise<Article> {
    const newArticle = await new this.articleModel(articleDTO)
    return newArticle.save()
  }

  async findByIdAndUpdate(articleID, articleDTO: ArticleDTO): Promise<Article> {
    const editedArticle = await this.articleModel.findByIdAndUpdate(
      articleID,
      articleDTO,
      { new: true }
    )
    return editedArticle
  }

  async findByIdAndRemove(articleID): Promise<Article> {
    const deletedArticle = await this.articleModel.findByIdAndRemove(articleID)
    return deletedArticle
  }
}
