import { PayloadAction } from '@reduxjs/toolkit'
import { IKeyword } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as keywordExtractionSelectors from './selectors'

const initialState = {
  data: undefined as IKeyword[],
  available: false,
  fetching: false,
}

const keywordExtractionService = createGenericSlice({
  name: 'keywordsExtraction',
  initialState,
  reducers: {
    extractKeywords: (
      state,
      action: PayloadAction<{ _id: string; text: string }>
    ) => {
      state.fetching = true
    },
  },
})

export { keywordExtractionService }
export { keywordExtractionSelectors }
