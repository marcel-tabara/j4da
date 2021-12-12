import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AppDTO } from './dto/app.dto'
import { App } from './interfaces/app.interface'

@Injectable()
export class AppService {
  constructor(@InjectModel('App') private readonly appModel: Model<App>) {}

  async find(): Promise<App[]> {
    const apps = await this.appModel.find().exec()
    return apps || []
  }

  async findById(_id): Promise<App> {
    const app = await this.appModel.findById(_id).exec()
    return app
  }

  async add(appDTO: AppDTO): Promise<App> {
    const newApp = await new this.appModel(appDTO)
    return newApp.save()
  }

  async findByIdAndUpdate(_id: string, appDTO: AppDTO): Promise<App> {
    const editedApp = await this.appModel.findByIdAndUpdate(_id, appDTO, {
      new: true,
    })
    return editedApp
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    const deletedApp = await this.appModel.findByIdAndRemove(_id)
    return deletedApp
  }
}
