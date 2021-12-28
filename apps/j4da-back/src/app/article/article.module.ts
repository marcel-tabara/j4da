import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryModule } from '../category/category.module'
import { KeywordModule } from '../keyword/keyword.module'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { ArticleSchema } from './schemas/article.schema'

@Module({
  imports: [
    CategoryModule,
    KeywordModule,
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
