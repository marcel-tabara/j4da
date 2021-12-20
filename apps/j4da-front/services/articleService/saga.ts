import { put, takeLatest } from 'redux-saga/effects'
import { articleService } from '.'
import { get } from '../utils/utils'
import { IArticles } from './../../types'

export function* watchGetArticles() {
  try {
    const articles: IArticles = yield get('/articles')
    yield put(articleService.actions.setArticles(articles))
  } catch (error) {
    console.log('########## error', error)
  }
}

export default function* rootSaga() {
  yield takeLatest('articles/getArticles', watchGetArticles)
}
