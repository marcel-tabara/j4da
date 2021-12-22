import { PayloadAction } from '@reduxjs/toolkit'
import { IKeyword } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as keywordSelectors from './selectors'

const initialState = {
  data: undefined as IKeyword[],
  status: undefined,
}

const keywordService = createGenericSlice({
  name: 'keywords',
  initialState,
  reducers: {
    getKeywords: (state) => {
      state.status = 'loading'
    },
    setKeywords: (state, action: PayloadAction<IKeyword[]>) => {
      state.data = action.payload
      state.status = 'available'
    },
  },
})

export { keywordService }
export { keywordSelectors }
