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
    const categories = await this.categoryModel.find().exec()
    return categories
  }

  async findById(_id): Promise<Category> {
    const category = await this.categoryModel.findById(_id).exec()
    return category
  }

  async add(categoryDTO: CategoryDTO): Promise<Category> {
    const category = await new this.categoryModel(categoryDTO)
    return category.save()
  }

  async findByIdAndUpdate(
    categoryDTO: CategoryDTO & { _id: string }
  ): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      categoryDTO._id,
      categoryDTO,
      { new: true }
    )
    return category
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    const category = await this.categoryModel.findByIdAndRemove(_id)
    return category
  }
}
