import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CategoryDTO } from './dto/category.dto'
import { Category } from './interfaces/category.interface'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}

  async find(): Promise<Category[]> {
    return await this.categoryModel.find().exec()
  }

  async findById(_id): Promise<Category> {
    return await this.categoryModel.findById(_id).exec()
  }

  async add(categoryDTO: CategoryDTO): Promise<Category> {
    const category = await new this.categoryModel(categoryDTO)
    return category.save()
  }

  async findByIdAndUpdate(
    _id: string,
    categoryDTO: CategoryDTO & { _id: string }
  ): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(_id, categoryDTO, {
      new: true,
    })
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    return await this.categoryModel.findByIdAndRemove(_id)
  }
}
