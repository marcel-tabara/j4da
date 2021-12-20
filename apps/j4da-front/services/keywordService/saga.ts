import { put, takeLatest } from 'redux-saga/effects'
import { keywordService } from '.'
import { get } from '../utils/utils'
import { IKeyword } from './../../types'

export function* watchGetKeywords() {
  try {
    const keywords: IKeyword[] = yield get('/keywords')
    yield put(keywordService.actions.setKeywords(keywords))
  } catch (error) {
    console.log('########## error', error)
  }
}

export default function* rootSaga() {
  yield takeLatest('keywords/getKeywords', watchGetKeywords)
}
