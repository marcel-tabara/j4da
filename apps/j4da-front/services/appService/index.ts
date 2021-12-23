import { PayloadAction } from '@reduxjs/toolkit'
import { IApp } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as appSelectors from './selectors'

const initialState = {
  data: undefined as IApp[],
  available: false,
  fetching: false,
}

const appService = createGenericSlice({
  name: 'apps',
  initialState,
  reducers: {
    getApps: (state) => {
      state.fetching = true
    },
    createApp: (state, action: PayloadAction<IApp>) => {
      state.fetching = true
    },
    updateApp: (state, action: PayloadAction<IApp>) => {
      state.fetching = true
    },
    deleteApp: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
  },
})

const { reducer } = appService
export { reducer as appServiceReducer }
export { appService }
export { appSelectors }
