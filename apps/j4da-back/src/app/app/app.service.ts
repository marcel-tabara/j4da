import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AppDTO } from './dto/app.dto'
import { App } from './interfaces/app.interface'

@Injectable()
export class AppService {
  constructor(@InjectModel('App') private readonly appModel: Model<App>) {}

  async find(): Promise<App[]> {
    return await this.appModel.find().exec()
  }

  async findById(_id): Promise<App> {
    return await this.appModel.findById(_id).exec()
  }

  async add(appDTO: AppDTO): Promise<App> {
    const newApp = await new this.appModel(appDTO)
    return newApp.save()
  }

  async findByIdAndUpdate(_id: string, appDTO: AppDTO): Promise<App> {
    return await this.appModel.findByIdAndUpdate(_id, appDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    return await this.appModel.findByIdAndRemove(_id)
  }
}
