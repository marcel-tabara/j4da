import { Test, TestingModule } from '@nestjs/testing'
import { ArticleService } from './article.service'

describe('BlogService', () => {
  let service: ArticleService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile()
    service = module.get<ArticleService>(ArticleService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
