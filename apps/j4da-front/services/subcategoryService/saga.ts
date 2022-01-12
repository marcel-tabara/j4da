import { put, takeLatest } from 'redux-saga/effects'
import { alertService, subcategoryService } from '../'
import { ISubCategory, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetSubcategories() {
  try {
    const subcategories = yield http.get<ISubCategory[]>('/subcategories')
    yield put(subcategoryService.actions.success(subcategories.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateSubCategory({ payload }: TaskAction<ISubCategory>) {
  try {
    yield http.post<ISubCategory>(`/subcategories/add`, payload)
    yield put(subcategoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateSubCategory({ payload }: TaskAction<ISubCategory>) {
  try {
    yield http.put<ISubCategory>(
      `/subcategories/${payload._id}/update`,
      payload
    )
    yield put(subcategoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteSubCategory({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/subcategories/${payload}/delete`)
    yield put(subcategoryService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('subcategories/getSubcategories', watchGetSubcategories)
  yield takeLatest('subcategories/createSubcategory', watchCreateSubCategory)
  yield takeLatest('subcategories/updateSubcategory', watchUpdateSubCategory)
  yield takeLatest('subcategories/deleteSubcategory', watchDeleteSubCategory)
}
