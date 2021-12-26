import { put, takeLatest } from 'redux-saga/effects'
import { alertService, keywordByIdService } from '..'
import { IKeyword, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetKeywordById({ type, payload }: TaskAction<string>) {
  try {
    const keyword = yield http.get<IKeyword>(`/keywords/${payload}`)
    yield put(keywordByIdService.actions.success(keyword.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.post<IKeyword>(`/categories/add`, payload)
    yield put(keywordByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.put<IKeyword>(`/categories/${payload._id}/update`, payload)
    yield put(keywordByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteKeyword({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/categories/${payload}/delete`)
    yield put(keywordByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keywordById/getKeywordById', watchGetKeywordById)
  yield takeLatest('keywordById/createKeyword', watchCreateKeyword)
  yield takeLatest('keywordById/updateKeyword', watchUpdateKeyword)
  yield takeLatest('keywordById/deleteKeyword', watchDeleteKeyword)
}
