import { put, takeLatest } from 'redux-saga/effects'
import { alertService, subcategoryByIdService } from '../'
import { ISubCategory, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetSubcategoryById({
  type,
  payload,
}: TaskAction<string>) {
  try {
    const subcategory = yield http.get<ISubCategory>(
      `/subcategories/${payload}`
    )
    yield put(subcategoryByIdService.actions.success(subcategory.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateSubcategory({ payload }: TaskAction<ISubCategory>) {
  try {
    yield http.post<ISubCategory>(`/subcategories/add`, payload)
    yield put(subcategoryByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateSubcategory({ payload }: TaskAction<ISubCategory>) {
  try {
    yield http.put<ISubCategory>(
      `/subcategories/${payload._id}/update`,
      payload
    )
    yield put(subcategoryByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteSubcategory({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/subcategories/${payload}/delete`)
    yield put(subcategoryByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest(
    'subcategoryById/getSubcategoryById',
    watchGetSubcategoryById
  )
  yield takeLatest('subcategoryById/createSubcategory', watchCreateSubcategory)
  yield takeLatest('subcategoryById/updateSubcategory', watchUpdateSubcategory)
  yield takeLatest('subcategoryById/deleteSubcategory', watchDeleteSubcategory)
}
