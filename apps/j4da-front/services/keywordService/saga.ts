import { put, takeLatest } from 'redux-saga/effects'
import { alertService, keywordService } from '../'
import { IKeyword } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetKeywords() {
  try {
    const keywords = yield http.get<IKeyword[]>('/keywords')
    yield put(keywordService.actions.setKeywords(keywords.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keywords/getKeywords', watchGetKeywords)
}
