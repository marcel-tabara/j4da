import { put, takeLatest } from 'redux-saga/effects'
import { alertService, keywordService } from '../'
import { IKeyword, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetKeywords() {
  try {
    const keywords = yield http.get<IKeyword[]>('/keywords')
    yield put(keywordService.actions.success(keywords.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.post<IKeyword>(`/keywords/add`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.put<IKeyword>(`/keywords/${payload._id}/update`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteKeyword({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/keywords/${payload}/delete`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keywords/getKeywords', watchGetKeywords)
  yield takeLatest('keywords/createKeyword', watchCreateKeyword)
  yield takeLatest('keywords/updateKeyword', watchUpdateKeyword)
  yield takeLatest('keywords/deleteKeyword', watchDeleteKeyword)
}
