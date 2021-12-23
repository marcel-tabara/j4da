import { Action } from '@reduxjs/toolkit'
import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleByIdService } from '../'
import { IArticle } from '../../utils/types'
import { http } from '../utils/http'

interface TaskAction<T> extends Action, ITask<T> {
  type: string
}

interface ITask<T> {
  id: number
  payload: T
}

export function* watchGetArticleById({ type, payload }: TaskAction<IArticle>) {
  try {
    const article = yield http.get<IArticle>(`/articles/${payload}`)
    yield put(articleByIdService.actions.setArticleById(article.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchCreateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.put<IArticle>(`/articles/${payload._id}/update`)
    yield put(articleByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchUpdateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.put<IArticle>(`/articles/${payload._id}/update`)
    yield put(articleByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('articleById/getArticleById', watchGetArticleById)
  yield takeLatest('articleById/createArticle', watchCreateArticle)
  yield takeLatest('articleById/updateArticle', watchUpdateArticle)
}
