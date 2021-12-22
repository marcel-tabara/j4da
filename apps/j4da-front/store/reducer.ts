import { combineReducers } from 'redux'
import {
  alertService,
  appService,
  articleService,
  categoryService,
  keywordService,
} from '../services'

const rootReducer = combineReducers({
  alertService: alertService.reducer,
  articleService: articleService.reducer,
  keywordService: keywordService.reducer,
  categoryService: categoryService.reducer,
  appService: appService.reducer,
})

export { rootReducer }
