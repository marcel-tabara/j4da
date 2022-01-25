import { combineReducers } from 'redux'
import {
  alertService,
  appByIdService,
  appService,
  articleByIdService,
  articleService,
  categoryByIdService,
  categoryService,
  keywordByIdService,
  keywordExtractionService,
  keywordService,
  subcategoryByIdService,
  subcategoryService,
} from '../services'

const rootReducer = combineReducers({
  alertService: alertService.reducer,
  articleService: articleService.reducer,
  articleByIdService: articleByIdService.reducer,
  keywordService: keywordService.reducer,
  keywordExtractionService: keywordExtractionService.reducer,
  categoryService: categoryService.reducer,
  appService: appService.reducer,
  appByIdService: appByIdService.reducer,
  categoryByIdService: categoryByIdService.reducer,
  keywordByIdService: keywordByIdService.reducer,
  subcategoryByIdService: subcategoryByIdService.reducer,
  subcategoryService: subcategoryService.reducer,
})

export { rootReducer }
