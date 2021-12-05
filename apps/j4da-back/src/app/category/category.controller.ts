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
import { CategoryService } from './category.service'
import { CategoryDTO } from './dto/category.dto'

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async find(@Res() res) {
    const categories = await this.categoryService.find()
    return res.status(HttpStatus.OK).json(categories)
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const category = await this.categoryService.findById(_id)
    if (!category) throw new NotFoundException('Category does not exist!')
    return res.status(HttpStatus.OK).json(category)
  }

  @Post('/add')
  async add(@Res() res, @Body() categoryDTO: CategoryDTO) {
    const newCategory = await this.categoryService.add(categoryDTO)
    return res.status(HttpStatus.OK).json({
      message: 'Category has been submitted successfully!',
      category: newCategory,
    })
  }

  @Put('/update')
  async findByIdAndUpdate(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id,
    @Body() categoryDTO: CategoryDTO
  ) {
    const editedCategory = await this.categoryService.findByIdAndUpdate(
      _id,
      categoryDTO
    )
    if (!editedCategory) throw new NotFoundException('Category does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Category has been successfully updated',
      category: editedCategory,
    })
  }

  @Delete('/delete')
  async findByIdAndRemove(
    @Res() res,
    @Query('_id', new ValidateObjectId()) _id
  ) {
    const deletedCategory = await this.categoryService.findByIdAndRemove(_id)
    if (!deletedCategory)
      throw new NotFoundException('Category does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'Category has been deleted!',
      category: deletedCategory,
    })
  }
}
