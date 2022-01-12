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

  async find(query): Promise<Category[]> {
    return await this.categoryModel.find(query).populate({
      path: 'app',
      select: '_id, title',
      strictPopulate: false,
    })
  }

  async findById(_id): Promise<Category> {
    return await this.categoryModel
      .findOne({ _id })
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .exec()
  }

  async add(categoryDTO: CategoryDTO): Promise<Category> {
    const category = await new this.categoryModel(categoryDTO)
    return category.save()
  }

  async findByIdAndUpdate(
    _id: string,
    categoryDTO: CategoryDTO & { _id: string }
  ): Promise<Category> {
    const newCat = await this.categoryModel.findByIdAndUpdate(
      _id,
      categoryDTO,
      {
        new: true,
      }
    )
    return newCat
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    return await this.categoryModel.findByIdAndRemove(_id)
  }
}
