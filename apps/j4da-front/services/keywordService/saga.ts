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
    yield http.post<IKeyword>(`/keywords/add`, payload)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateKeyword({ payload }: TaskAction<IKeyword>) {
  try {
    yield http.put<IKeyword>(`/keywords/${payload._id}/update`, payload)
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

export function* watchKeywordsByArticleId({ payload }: TaskAction<string>) {
  try {
    yield http.get<string>(`/keywords/${payload}/byArticle`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchExtractKeywords({
  type,
  payload,
}: TaskAction<{ _id: string; text: string }>) {
  try {
    const extractedKeywords = yield http.post<{ _id: string; text: string }>(
      '/keywords/extractKeywords',
      { _id: payload._id, text: payload.text }
    )
    yield put(keywordService.actions.success(extractedKeywords.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteKeywordByArticleId({
  payload,
}: TaskAction<string>) {
  try {
    yield http.delete<string>(`/keywords/${payload}/deleteByArticleId`)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchInsertManyKeywords({ payload }: TaskAction<IKeyword[]>) {
  try {
    yield http.post<IKeyword[]>(`/keywords/insertMany`, payload)
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keywords/keywordsByArticleId', watchKeywordsByArticleId)
  yield takeLatest('keywords/getKeywords', watchGetKeywords)
  yield takeLatest('keywords/createKeyword', watchCreateKeyword)
  yield takeLatest('keywords/updateKeyword', watchUpdateKeyword)
  yield takeLatest('keywords/deleteKeyword', watchDeleteKeyword)
  yield takeLatest('keywords/extractKeywords', watchExtractKeywords)
  yield takeLatest('keywords/insertMany', watchInsertManyKeywords)
  yield takeLatest(
    'keywords/deleteKeywordByArticleId',
    watchDeleteKeywordByArticleId
  )
}
