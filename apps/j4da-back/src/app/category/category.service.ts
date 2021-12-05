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
    const categorys = await this.categoryModel.find().exec()
    return categorys
  }

  async findById(_id): Promise<Category> {
    const category = await this.categoryModel.findById(_id).exec()
    return category
  }

  async add(categoryDTO: CategoryDTO): Promise<Category> {
    const newCategory = await new this.categoryModel(categoryDTO)
    return newCategory.save()
  }

  async findByIdAndUpdate(_id, categoryDTO: CategoryDTO): Promise<Category> {
    const editedCategory = await this.categoryModel.findByIdAndUpdate(
      _id,
      categoryDTO,
      { new: true }
    )
    return editedCategory
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    const deletedCategory = await this.categoryModel.findByIdAndRemove(_id)
    return deletedCategory
  }
}
