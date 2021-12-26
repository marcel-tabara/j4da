import { put, takeLatest } from 'redux-saga/effects'
import { alertService, categoryByIdService } from '../'
import { ICategory, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetCategoryById({ type, payload }: TaskAction<string>) {
  try {
    const category = yield http.get<ICategory>(`/categories/${payload}`)
    yield put(categoryByIdService.actions.success(category.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateCategory({ payload }: TaskAction<ICategory>) {
  try {
    yield http.post<ICategory>(`/categories/add`, payload)
    yield put(categoryByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateCategory({ payload }: TaskAction<ICategory>) {
  try {
    yield http.put<ICategory>(`/categories/${payload._id}/update`, payload)
    yield put(categoryByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteCategory({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/categories/${payload}/delete`)
    yield put(categoryByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('categoryById/getCategoryById', watchGetCategoryById)
  yield takeLatest('categoryById/createCategory', watchCreateCategory)
  yield takeLatest('categoryById/updateCategory', watchUpdateCategory)
  yield takeLatest('categoryById/deleteCategory', watchDeleteCategory)
}
