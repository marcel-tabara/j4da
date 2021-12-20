import { put, takeLatest } from 'redux-saga/effects'
import { categoryService } from '.'
import { get } from '../utils/utils'
import { ICategory } from './../../types'

export function* watchGetCategories() {
  try {
    const categories: ICategory[] = yield get('/articles')
    yield put(categoryService.actions.setCategories(categories))
  } catch (error) {
    console.log('########## error', error)
  }
}

export default function* rootSaga() {
  yield takeLatest('categories/getCategories', watchGetCategories)
}
