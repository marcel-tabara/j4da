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
    const newKeyword = await this.keywordService.add(keywordDTO)
    return res.status(HttpStatus.OK).json({
      message: 'Keyword has been submitted successfully!',
      keyword: newKeyword,
    })
  }

  @Put('/update')
  async findByIdAndUpdate(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id,
    @Body() keywordDTO: KeywordDTO
  ) {
    const editedKeyword = await this.keywordService.findByIdAndUpdate(
      _id,
      keywordDTO
    )
    if (!editedKeyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Keyword has been successfully updated',
      keyword: editedKeyword,
    })
  }

  @Delete('/delete')
  async findByIdAndRemove(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id
  ) {
    const deletedKeyword = await this.keywordService.findByIdAndRemove(_id)
    if (!deletedKeyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Keyword has been deleted!',
      keyword: deletedKeyword,
    })
  }
}
