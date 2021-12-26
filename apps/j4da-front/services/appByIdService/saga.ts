import { put, takeLatest } from 'redux-saga/effects'
import { alertService, appByIdService } from '../'
import { IApp, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetAppById({ type, payload }: TaskAction<string>) {
  try {
    const app = yield http.get<IApp>(`/apps/${payload}`)
    yield put(appByIdService.actions.success(app.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateApp({ payload }: TaskAction<IApp>) {
  try {
    yield http.post<IApp>(`/apps/add`, payload)
    yield put(appByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateApp({ payload }: TaskAction<IApp>) {
  try {
    yield http.put<IApp>(`/apps/${payload._id}/update`, payload)
    yield put(appByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteApp({ payload }: TaskAction<string>) {
  try {
    yield http.delete<string>(`/apps/${payload}/delete`)
    yield put(appByIdService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('appById/getAppById', watchGetAppById)
  yield takeLatest('appById/createApp', watchCreateApp)
  yield takeLatest('appById/updateApp', watchUpdateApp)
  yield takeLatest('appById/deleteApp', watchDeleteApp)
}
