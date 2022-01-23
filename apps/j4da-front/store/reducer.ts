import { combineReducers } from 'redux'
import {
  alertService,
  appByIdService,
  appService,
  articleByIdService,
  articleService,
  articlesKeywordsService,
  categoryByIdService,
  categoryService,
  keywordByIdService,
  keywordService,
  subcategoryByIdService,
  subcategoryService,
} from '../services'

const rootReducer = combineReducers({
  alertService: alertService.reducer,
  articleService: articleService.reducer,
  articleByIdService: articleByIdService.reducer,
  articlesKeywordsService: articlesKeywordsService.reducer,
  keywordService: keywordService.reducer,
  categoryService: categoryService.reducer,
  appService: appService.reducer,
  appByIdService: appByIdService.reducer,
  categoryByIdService: categoryByIdService.reducer,
  keywordByIdService: keywordByIdService.reducer,
  subcategoryByIdService: subcategoryByIdService.reducer,
  subcategoryService: subcategoryService.reducer,
})

export { rootReducer }
