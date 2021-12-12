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
import { PaginationDto } from './dto/pagination.dto'

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async findPaginated(@Res() res, @Query() paginationQuery: PaginationDto) {
    const { limit, skip } = paginationQuery
    const data = await this.articleService.find(paginationQuery)
    return res
      .status(HttpStatus.OK)
      .json({ limit, skip, total: data.length, data })
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const article = await this.articleService.findById(_id)
    // if (!article) throw new NotFoundException('Article does not exist!');
    return article
      ? res.status(HttpStatus.OK).json(article)
      : res.status(HttpStatus.NOT_FOUND)
  }

  @Post('/create')
  async create(@Res() res, @Body() articleDTO: ArticleDTO) {
    const article = await this.articleService.create(articleDTO)
    return res.status(HttpStatus.OK).json({
      message: 'success',
      article,
    })
  }

  @Put('/update')
  async findByIdAndUpdate(
    @Res() res,
    @Body() articleDTO: ArticleDTO & { _id: string }
  ) {
    const article = await this.articleService.findByIdAndUpdate(articleDTO)
    if (!article) throw new NotFoundException('Article does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      article,
    })
  }

  @Delete('/delete')
  async findByIdAndRemove(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id
  ) {
    const article = await this.articleService.findByIdAndRemove(_id)
    if (!article) throw new NotFoundException('Article does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      article,
    })
  }
}
