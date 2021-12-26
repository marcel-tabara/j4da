import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articlesKeywordsService } from '..'
import { IArticlesKeyword } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticlesKeywords() {
  try {
    const articlesKeywords = yield http.get<IArticlesKeyword[]>(
      '/articles/articlesKeywords'
    )
    yield put(articlesKeywordsService.actions.success(articlesKeywords.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest(
    'articlesKeywords/getArticlesKeywords',
    watchGetArticlesKeywords
  )
}
