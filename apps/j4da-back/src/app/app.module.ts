import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { KeywordModule } from './keyword/keyword.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog', {
      useNewUrlParser: true,
    }),
    ArticleModule,
    CategoryModule,
    KeywordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
