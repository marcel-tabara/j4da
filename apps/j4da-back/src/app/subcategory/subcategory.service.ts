import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SubcategoryDTO } from './dto/subcategory.dto'
import { Subcategory } from './interfaces/subcategory.interface'

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel('Subcategory')
    private readonly subcategoryModel: Model<Subcategory>
  ) {}

  async find(query): Promise<Subcategory[]> {
    return await this.subcategoryModel.find(query).populate({
      path: 'category',
      select: '_id, slug',
      strictPopulate: false,
    })
  }

  async findById(_id): Promise<Subcategory> {
    return await this.subcategoryModel
      .findOne({ _id })
      .populate({
        path: 'category',
        select: '_id, slug',
        strictPopulate: false,
      })
      .exec()
  }

  async add(subcategoryDTO: SubcategoryDTO): Promise<Subcategory> {
    const subcategory = await new this.subcategoryModel(subcategoryDTO)
    return subcategory.save()
  }

  async findByIdAndUpdate(
    _id: string,
    subcategoryDTO: SubcategoryDTO & { _id: string }
  ): Promise<Subcategory> {
    const newCat = await this.subcategoryModel.findByIdAndUpdate(
      _id,
      subcategoryDTO,
      {
        new: true,
      }
    )

    return newCat
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    return await this.subcategoryModel.findByIdAndRemove(_id)
  }
}
