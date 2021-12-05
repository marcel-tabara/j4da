import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common'
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes'
import { ArticleService } from './article.service'
import { ArticleDTO } from './dto/article.dto'

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async find(@Res() res) {
    const articles = await this.articleService.find()
    return articles
      ? res.status(HttpStatus.OK).json(articles)
      : res.status(HttpStatus.NOT_FOUND).json(articles)
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const article = await this.articleService.findById(_id)
    // if (!article) throw new NotFoundException('Article does not exist!');
    return article
      ? res.status(HttpStatus.OK).json(article)
      : res.status(HttpStatus.NOT_FOUND)
  }

  @Post('/add')
  async add(@Res() res, @Body() articleDTO: ArticleDTO) {
    const newArticle = await this.articleService.add(articleDTO)
    return res.status(HttpStatus.OK).json({
      message: 'Article has been submitted successfully!',
      article: newArticle,
    })
  }

  @Put('/update')
  async findByIdAndUpdate(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id,
    @Body() articleDTO: ArticleDTO
  ) {
    const editedArticle = await this.articleService.findByIdAndUpdate(
      _id,
      articleDTO
    )
    if (!editedArticle) throw new NotFoundException('Article does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Article has been successfully updated',
      article: editedArticle,
    })
  }

  @Delete('/delete')
  async findByIdAndRemove(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id
  ) {
    const deletedArticle = await this.articleService.findByIdAndRemove(_id)
    if (!deletedArticle) throw new NotFoundException('Article does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Article has been deleted!',
      article: deletedArticle,
    })
  }
}
