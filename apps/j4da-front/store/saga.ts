import { all, fork } from 'redux-saga/effects'
import appSaga from '../services/appService/saga'
import articleSaga from '../services/articleService/saga'
import categorySaga from '../services/categoryService/saga'
import keywordSaga from '../services/keywordService/saga'

export default function* sagas() {
  yield all(
    [articleSaga, appSaga, keywordSaga, categorySaga].map((saga) => fork(saga))
  )
}
