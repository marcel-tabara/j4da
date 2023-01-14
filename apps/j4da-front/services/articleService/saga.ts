import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleService, keywordService } from '../'
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
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateArticle({ payload }: TaskAction<IArticle>) {
  try {
    yield http.put<IArticle>(`/articles/${payload._id}/update`, payload)
    yield put(articleService.actions.reset())
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteArticle({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/articles/${payload}/delete`)
    yield put(articleService.actions.reset())
    yield put(keywordService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchGenerateArticles() {
  try {
    const articles = yield http.get<string>('articles/generate')
    yield put(articleService.actions.success(articles.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchGenerateContentByApp({ payload }: TaskAction<string>) {
  try {
    yield http.post<{ _id: string }>(`/articles/generateContentByApp`, {
      _id: payload,
    })
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
  yield takeLatest('articles/generateArticles', watchGenerateArticles)
  yield takeLatest('articles/generateContentByApp', watchGenerateContentByApp)
}
