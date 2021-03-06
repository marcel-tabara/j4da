import { Test, TestingModule } from '@nestjs/testing'
import { CategoryService } from './category.service'

describe('BlogService', () => {
  let service: CategoryService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile()
    service = module.get<CategoryService>(CategoryService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
