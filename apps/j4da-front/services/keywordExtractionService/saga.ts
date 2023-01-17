import { put, takeLatest } from 'redux-saga/effects'
import { alertService, keywordExtractionService } from '../'
import { TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchExtractKeywords({
  type,
  payload,
}: TaskAction<{ _id: string; url: string; text: string }>) {
  try {
    const extractedKeywords = yield http.post<{
      _id: string
      url: string
      text: string
    }>('/keywords/extractKeywords', {
      _id: payload._id,
      url: payload.url,
      text: payload.text,
    })
    yield put(keywordExtractionService.actions.success(extractedKeywords.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keywordsExtraction/extractKeywords', watchExtractKeywords)
}
