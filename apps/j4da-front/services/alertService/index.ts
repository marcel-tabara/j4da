import { PayloadAction } from '@reduxjs/toolkit'
import { createGenericSlice } from '../utils/genericSlice'
import * as alertSelectors from './selectors'

const initialState = {
  data: [],
  available: false,
  fetching: false,
}

const alertService = createGenericSlice({
  name: 'alerts',
  initialState,
  reducers: {
    getAlerts: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
  },
})

export { alertService }
export { alertSelectors }
