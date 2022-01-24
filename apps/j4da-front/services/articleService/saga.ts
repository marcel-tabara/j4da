import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleService } from '../'
import { IArticle, IArticles, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticles() {
  try {
    const articles = yield http.get<IArticles>('/articles')
    yield put(articleService.actions.success(articles.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.post<IArticle>(`/articles/add`, payload)
    yield put(articleService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.put<IArticle>(`/articles/${payload._id}/update`, payload)
    yield put(articleService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteArticle({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/articles/${payload}/delete`)
    yield put(articleService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('articles/getArticles', watchGetArticles)
  yield takeLatest('articles/createArticle', watchCreateArticle)
  yield takeLatest('articles/updateArticle', watchUpdateArticle)
  yield takeLatest('articles/deleteArticle', watchDeleteArticle)
}
