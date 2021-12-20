import { combineReducers } from 'redux'
import { articleService } from '../services/articleService'
import { categoryService } from '../services/categoryService'
import { keywordService } from '../services/keywordService'

const rootReducer = combineReducers({
  articleService: articleService.reducer,
  keywordService: keywordService.reducer,
  categoryService: categoryService.reducer,
})

export { rootReducer }
