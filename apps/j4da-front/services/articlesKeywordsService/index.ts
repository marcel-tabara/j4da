import { PayloadAction } from '@reduxjs/toolkit'
import { IArticlesKeywords } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articlesKeywordsSelectors from './selectors'

const initialState = {
  data: undefined as IArticlesKeywords,
  available: false,
  fetching: false,
}

const articlesKeywordsService = createGenericSlice({
  name: 'articlesKeywords',
  initialState,
  reducers: {
    getArticlesKeywords: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
  },
})

export { articlesKeywordsService }
export { articlesKeywordsSelectors }
