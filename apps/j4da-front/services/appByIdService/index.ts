import { PayloadAction } from '@reduxjs/toolkit'
import { IApp, IArticle } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as appByIdSelectors from './selectors'

const initialState = {
  data: undefined as IArticle,
  status: undefined,
}

const appByIdService = createGenericSlice({
  name: 'appById',
  initialState,
  reducers: {
    getAppById: (state, action: PayloadAction<string>) => {
      state.status = 'loading'
    },
    setAppById: (state, action) => {
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

export { appByIdService }
export { appByIdSelectors }
