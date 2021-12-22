import { Action } from '@reduxjs/toolkit'
import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleService } from '../'
import { IArticle, IArticles } from '../../utils/types'
import { http } from '../utils/http'

interface TaskAction extends Action, ITask {
  type: 'articles/getArticleById'
}

interface ITask {
  id: number
  payload: string
}

export function* watchGetArticles() {
  try {
    const articles = yield http.get<IArticles>('/articles')
    yield put(articleService.actions.setArticles(articles.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchGetArticleById({ payload }: TaskAction) {
  try {
    const articles = yield http.get<IArticle>(`/articles/${payload}`)
    yield put(articleService.actions.setArticleById(articles.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('articles/getArticles', watchGetArticles)
  yield takeLatest('articles/getArticleById', watchGetArticleById)
}
