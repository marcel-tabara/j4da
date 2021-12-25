import { put, takeLatest } from 'redux-saga/effects'
import { alertService, articleByIdService } from '../'
import { IArticle, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetArticleById({ type, payload }: TaskAction<string>) {
  try {
    const article = yield http.get<IArticle>(`/articles/${payload}`)
    yield put(articleByIdService.actions.success(article.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('articleById/getArticleById', watchGetArticleById)
}
