import { combineReducers } from 'redux'
import {
  alertService,
  appService,
  articleByIdService,
  articleService,
  articlesKeywordsService,
  categoryService,
  extractedKeywordsService,
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
})

export { rootReducer }
