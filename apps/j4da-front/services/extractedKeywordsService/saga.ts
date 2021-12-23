import { put, takeLatest } from 'redux-saga/effects'
import { alertService, extractedKeywordsService } from '../'
import { TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchExtractKeywords({ type, payload }: TaskAction<string>) {
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
