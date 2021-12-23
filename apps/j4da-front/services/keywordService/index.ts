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
    createKeyword: (state, action: PayloadAction<IKeyword>) => {
      state.status = 'loading'
    },
    updateKeyword: (state, action: PayloadAction<IKeyword>) => {
      state.status = 'loading'
    },
    deleteKeyword: (state, action: PayloadAction<string>) => {
      state.status = 'loading'
    },
  },
})

export { keywordService }
export { keywordSelectors }
