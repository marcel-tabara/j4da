import { Injectable, Logger } from '@nestjs/common'
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
    Logger.log(`SubcategoryService: find ${JSON.stringify(query)}`)
    return await this.subcategoryModel.find(query).populate({
      path: 'category',
      select: '_id, slug',
      strictPopulate: false,
    })
  }

  async findById(_id): Promise<Subcategory> {
    Logger.log(`SubcategoryService: findById ${_id}`)
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
    Logger.log(`SubcategoryService: findByIdAndUpdate ${_id}`)
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
    Logger.log(`SubcategoryService: findByIdAndRemove ${_id}`)
    return await this.subcategoryModel.findByIdAndRemove(_id)
  }
}
