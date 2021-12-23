import { put, takeLatest } from 'redux-saga/effects'
import { alertService, keywordService } from '../'
import { IKeyword, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetKeywords() {
  try {
    const keywords = yield http.get<IKeyword[]>('/keywords')
    yield put(keywordService.actions.setKeywords(keywords.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchCreateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.post<IKeyword>(`/categories/update`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchUpdateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.put<IKeyword>(`/categories/${payload._id}/add`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchDeleteKeyword({ payload }: TaskAction<string>) {
  try {
    yield http.post<string>(`/apps/${payload}/delete`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keywords/getKeywords', watchGetKeywords)
  yield takeLatest('keywords/createKeywords', watchCreateKeyword)
  yield takeLatest('keywords/updateKeywords', watchUpdateKeyword)
  yield takeLatest('keywords/deleteKeywords', watchDeleteKeyword)
}
