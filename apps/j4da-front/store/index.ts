import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware(), logger, sagaMiddleware]

const preloadedState = {}

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>

export default store
