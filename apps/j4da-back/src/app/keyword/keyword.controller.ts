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
  Res,
} from '@nestjs/common'
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes'
import { KeywordDTO } from './dto/keyword.dto'
import { KeywordService } from './keyword.service'

@Controller('keywords')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}

  @Get()
  async find(@Res() res) {
    const keywords = await this.keywordService.find()
    return res.status(HttpStatus.OK).json(keywords)
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const keyword = await this.keywordService.findById(_id)
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json(keyword)
  }

  @Post('/add')
  async add(@Res() res, @Body() keywordDTO: KeywordDTO) {
    const keyword = await this.keywordService.add(keywordDTO)
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }

  @Put(':_id/update')
  async findByIdAndUpdate(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id,
    @Body() keywordDTO: KeywordDTO & { _id: string }
  ) {
    const keyword = await this.keywordService.findByIdAndUpdate(_id, keywordDTO)
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }

  @Post('/bulkupsert')
  async findManyAndUpdate(@Res() res, @Body() keywords: string[]) {
    const upsertmany = await this.keywordService.findManyAndUpdate(keywords)

    return res.status(HttpStatus.OK).json({
      message: 'success',
      upsertmany,
    })
  }

  @Delete(':_id/delete')
  async findByIdAndRemove(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const keyword = await this.keywordService.findByIdAndRemove(_id)
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }
}
