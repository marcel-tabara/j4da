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
import { AppService } from './app.service'
import { AppDTO } from './dto/app.dto'

@Controller('apps')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async find(@Res() res) {
    const apps = await this.appService.find()
    return res.status(HttpStatus.OK).json(apps)
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const app = await this.appService.findById(_id)
    if (!app) throw new NotFoundException('App does not exist!')
    return res.status(HttpStatus.OK).json(app)
  }

  @Post('/add')
  async add(@Res() res, @Body() appDTO: AppDTO) {
    const app = await this.appService.add(appDTO)
    return res.status(HttpStatus.OK).json({
      message: 'success',
      app,
    })
  }

  @Put('/update')
  async findByIdAndUpdate(
    @Res() res,
    @Body() appDTO: AppDTO & { _id: string }
  ) {
    const app = await this.appService.findByIdAndUpdate(appDTO)
    if (!app) throw new NotFoundException('App does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      app,
    })
  }

  @Delete('/delete')
  async findByIdAndRemove(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id
  ) {
    const app = await this.appService.findByIdAndRemove(_id)
    if (!app) throw new NotFoundException('App does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      app,
    })
  }
}
