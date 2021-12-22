import { put, takeLatest } from 'redux-saga/effects'
import { alertService, appService } from '../'
import { IApp } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetApps() {
  try {
    const apps = yield http.get<IApp[]>('/apps')
    yield put(appService.actions.setApps(apps?.data))
  } catch (error) {
    yield put(alertService.actions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('apps/getApps', watchGetApps)
}
