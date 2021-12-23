import { PayloadAction } from '@reduxjs/toolkit'
import { IApp } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as appSelectors from './selectors'

const initialState = {
  data: undefined as IApp[],
  status: undefined,
}

const appService = createGenericSlice({
  name: 'apps',
  initialState,
  reducers: {
    getApps: (state) => {
      state.status = 'loading'
    },
    setApps: (state, action: PayloadAction<IApp[]>) => {
      state.data = action.payload
      state.status = 'available'
    },
    createApp: (state, action: PayloadAction<IApp>) => {
      state.status = 'loading'
    },
    updateApp: (state, action: PayloadAction<IApp>) => {
      state.status = 'loading'
    },
    deleteApp: (state, action: PayloadAction<string>) => {
      state.status = 'loading'
    },
  },
})

const { reducer } = appService
export { reducer as appServiceReducer }
export { appService }
export { appSelectors }
