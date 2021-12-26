import { PayloadAction } from '@reduxjs/toolkit'
import { IKeyword } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as keywordByIdSelectors from './selectors'

const initialState = {
  data: undefined as IKeyword,
  available: false,
  fetching: false,
}

const keywordByIdService = createGenericSlice({
  name: 'keywordById',
  initialState,
  reducers: {
    getKeywordById: (state, action: PayloadAction<string>) => {
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
  },
})

export { keywordByIdService }
export { keywordByIdSelectors }
