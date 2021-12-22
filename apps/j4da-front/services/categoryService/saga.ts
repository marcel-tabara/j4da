import { put, takeLatest } from 'redux-saga/effects'
import { alertService, categoryService } from '../'
import { ICategory } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetCategories() {
  try {
    const categories = yield http.get<ICategory[]>('/categories')
    yield put(categoryService.actions.setCategories(categories.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('categories/getCategories', watchGetCategories)
}
