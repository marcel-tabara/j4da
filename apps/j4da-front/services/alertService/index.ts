import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as alertSelectors from './selectors'

const alertService = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
  },
  reducers: {
    getAlerts: () => undefined,
    setAlert: (state, action: PayloadAction<string>) => undefined,
  },
})

export { alertService }
export { alertSelectors }
