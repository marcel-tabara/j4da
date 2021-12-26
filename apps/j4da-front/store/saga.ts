import { all, fork } from 'redux-saga/effects'
import appByIdSaga from '../services/appByIdService/saga'
import appSaga from '../services/appService/saga'
import articleByIdSaga from '../services/articleByIdService/saga'
import articleSaga from '../services/articleService/saga'
import articlesKeywordsSaga from '../services/articlesKeywordsService/saga'
import categoryByIdSaga from '../services/categoryByIdService/saga'
import categorySaga from '../services/categoryService/saga'
import extractedKeywordsSaga from '../services/extractedKeywordsService/saga'
import keywordByIdSaga from '../services/keywordByIdService/saga'
import keywordSaga from '../services/keywordService/saga'

export default function* sagas() {
  yield all(
    [
      articleSaga,
      articleByIdSaga,
      articlesKeywordsSaga,
      extractedKeywordsSaga,
      appSaga,
      appByIdSaga,
      keywordSaga,
      keywordByIdSaga,
      categorySaga,
      categoryByIdSaga,
    ].map((saga) => fork(saga))
  )
}
