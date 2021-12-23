import { put, takeLatest } from 'redux-saga/effects'
import { alertService, categoryService } from '../'
import { ICategory, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetCategories() {
  try {
    const categories = yield http.get<ICategory[]>('/categories')
    yield put(categoryService.actions.success(categories.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateCategory({ payload }: TaskAction<ICategory>) {
  try {
    yield http.post<ICategory>(`/categories/add`)
    yield put(categoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateCategory({ payload }: TaskAction<ICategory>) {
  try {
    yield http.put<ICategory>(`/categories/${payload._id}/update`)
    yield put(categoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteCategory({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/categories/${payload}/delete`)
    yield put(categoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('categories/getCategories', watchGetCategories)
  yield takeLatest('categories/createCategories', watchCreateCategory)
  yield takeLatest('categories/updateCategories', watchUpdateCategory)
  yield takeLatest('categories/deleteCategories', watchDeleteCategory)
}
