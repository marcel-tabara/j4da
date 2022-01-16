import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articlesKeywordsService } from '..'
import { GetArticlesKeywordsPayload, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticlesKeywords({
  payload,
}: TaskAction<GetArticlesKeywordsPayload>) {
  try {
    const articlesKeywords = yield http.post<GetArticlesKeywordsPayload>(
      '/articles/articlesKeywords',
      payload
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
