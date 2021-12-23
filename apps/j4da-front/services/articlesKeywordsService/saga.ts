import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articlesKeywordsService } from '..'
import { IArticlesKeywords } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticlesKeywords() {
  try {
    const articlesKeywords = yield http.get<IArticlesKeywords>(
      '/articles/articlesKeywords'
    )
    yield put(
      articlesKeywordsService.actions.getArticlesKeywords(articlesKeywords)
    )
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest(
    'articlesKeywords/getArticlesKeywords',
    watchGetArticlesKeywords
  )
}
