import { put, takeLatest } from 'redux-saga/effects'
import { alertService, appService } from '../'
import { IApp, TaskAction } from '../../utils/types'
import { http } from '../utils/http'

export function* watchGetApps() {
  try {
    const apps = yield http.get<IApp[]>('/apps')
    yield put(appService.actions.success(apps?.data))
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchUpdateApp({ payload }: TaskAction<IApp>) {
  try {
    yield http.put<IApp>(`/apps/${payload._id}/update`)
    yield put(appService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchCreateApp({ payload }: TaskAction<IApp>) {
  try {
    yield http.post<IApp>(`/apps/add`)
    yield put(appService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export function* watchDeleteApp({ payload }: TaskAction<string>) {
  try {
    yield http.delete<IApp>(`/apps/${payload}/delete`)
    yield put(appService.actions.reset())
  } catch (error) {
    yield put(alertService.actions.success(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('apps/getApps', watchGetApps)
  yield takeLatest('apps/createApp', watchCreateApp)
  yield takeLatest('apps/updateApp', watchUpdateApp)
  yield takeLatest('apps/deleteApp', watchDeleteApp)
}
