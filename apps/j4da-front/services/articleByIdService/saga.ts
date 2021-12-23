import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleByIdService } from '../'
import { IArticle, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticleById({ type, payload }: TaskAction<string>) {
  try {
    const article = yield http.get<IArticle>(`/articles/${payload}`)
    yield put(articleByIdService.actions.setArticleById(article.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchCreateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.post<IArticle>(`/keywords/${payload._id}/update`)
    yield put(articleByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchUpdateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.put<IArticle>(`/keywords/${payload._id}/update`)
    yield put(articleByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchDeleteArticle({ payload }: TaskAction<string>) {
  try {
    yield http.post<string>(`/apps/${payload}/delete`)
    yield put(articleByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('articleById/getArticleById', watchGetArticleById)
  yield takeLatest('articleById/createArticle', watchCreateArticle)
  yield takeLatest('articleById/updateArticle', watchUpdateArticle)
  yield takeLatest('articleById/deleteArticle', watchDeleteArticle)
}
