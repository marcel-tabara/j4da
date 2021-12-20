import { all, fork } from 'redux-saga/effects'
import articleSaga from '../services/articleService/saga'

export default function* sagas() {
  yield all([articleSaga].map((saga) => fork(saga)))
}
