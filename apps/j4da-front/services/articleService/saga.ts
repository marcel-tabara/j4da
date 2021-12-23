import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleService } from '../'
import { IArticles } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticles() {
  try {
    const articles = yield http.get<IArticles>('/articles')
    yield put(articleService.actions.success(articles.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('articles/getArticles', watchGetArticles)
}
