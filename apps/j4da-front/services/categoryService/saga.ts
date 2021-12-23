import { put, takeLatest } from 'redux-saga/effects'
import { alertService, categoryService } from '../'
import { ICategory, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetCategories() {
  try {
    const categories = yield http.get<ICategory[]>('/categories')
    yield put(categoryService.actions.setCategories(categories.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchCreateCategory({ payload }: TaskAction<ICategory>) {
  try {
    yield http.post<ICategory>(`/categories/update`)
    yield put(categoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchUpdateCategory({ payload }: TaskAction<ICategory>) {
  try {
    yield http.put<ICategory>(`/categories/${payload._id}/add`)
    yield put(categoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export function* watchDeleteCategory({ payload }: TaskAction<string>) {
  try {
    yield http.post<string>(`/apps/${payload}/delete`)
    yield put(categoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('categories/getCategories', watchGetCategories)
  yield takeLatest('categories/createCategories', watchCreateCategory)
  yield takeLatest('categories/updateCategories', watchUpdateCategory)
  yield takeLatest('categories/deleteCategories', watchDeleteCategory)
}
