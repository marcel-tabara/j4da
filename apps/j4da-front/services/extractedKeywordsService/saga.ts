import { put, takeLatest } from 'redux-saga/effects'
import { alertService, extractedKeywordsService } from '../'
import { http } from '../utils/http'

export function* watchExtractKeywords({ type, payload }) {
  try {
    const extractedKeywords = yield http.post<string>(
      '/articles/extractKeywords',
      JSON.stringify({ article: payload })
    )
    yield put(
      extractedKeywordsService.actions.setExtractedKeywords(
        extractedKeywords.data
      )
    )
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('extractedKeywords/extractKeywords', watchExtractKeywords)
}
