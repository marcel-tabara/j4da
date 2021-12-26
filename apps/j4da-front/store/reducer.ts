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
  extractedKeywordsService,
  keywordByIdService,
  keywordService,
} from '../services'

const rootReducer = combineReducers({
  alertService: alertService.reducer,
  articleService: articleService.reducer,
  articleByIdService: articleByIdService.reducer,
  articlesKeywordsService: articlesKeywordsService.reducer,
  extractedKeywordsService: extractedKeywordsService.reducer,
  keywordService: keywordService.reducer,
  categoryService: categoryService.reducer,
  appService: appService.reducer,
  appByIdService: appByIdService.reducer,
  categoryByIdService: categoryByIdService.reducer,
  keywordByIdService: keywordByIdService.reducer,
})

export { rootReducer }
