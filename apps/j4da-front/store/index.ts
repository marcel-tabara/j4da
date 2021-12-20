import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './reducer'
import rootSaga from './saga'

const store = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, sagaMiddleware, ...getDefaultMiddleware()],
  })

  sagaMiddleware.run(rootSaga)

  return store
}

//export type RootState = ReturnType<typeof store().getState>

export default store
