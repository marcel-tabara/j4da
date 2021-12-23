import { PayloadAction } from '@reduxjs/toolkit'
import { IApp, IArticle } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as appByIdSelectors from './selectors'

const initialState = {
  data: undefined as IArticle,
  available: false,
  fetching: false,
}

const appByIdService = createGenericSlice({
  name: 'appById',
  initialState,
  reducers: {
    getAppById: (state, action: PayloadAction<string>) => {
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

export { appByIdService }
export { appByIdSelectors }
