import { PayloadAction } from '@reduxjs/toolkit'
import { IKeyword } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as keywordSelectors from './selectors'

const initialState = {
  data: undefined as IKeyword[],
  available: false,
  fetching: false,
}

const keywordService = createGenericSlice({
  name: 'keywords',
  initialState,
  reducers: {
    getKeywords: (state) => {
      state.fetching = true
    },
    createKeyword: (state, action: PayloadAction<IKeyword>) => {
      state.fetching = true
    },
    updateKeyword: (state, action: PayloadAction<IKeyword>) => {
      state.fetching = true
    },
    deleteKeyword: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
    bulkremove: (state, action: PayloadAction<string[]>) => {
      state.fetching = true
    },
    bulkupsert: (state, action: PayloadAction<string[]>) => {
      state.fetching = true
    },
  },
})

export { keywordService }
export { keywordSelectors }
