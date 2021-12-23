import { PayloadAction } from '@reduxjs/toolkit'
import { IArticlesKeywords } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articlesKeywordsSelectors from './selectors'

const initialState = {
  data: undefined as IArticlesKeywords,
  status: undefined,
}

const articlesKeywordsService = createGenericSlice({
  name: 'articlesKeywords',
  initialState,
  reducers: {
    getArticlesKeywords: (state, action: PayloadAction<string>) => {
      state.status = 'loading'
    },
    setArticlesKeywords: (state, action: PayloadAction<IArticlesKeywords>) => {
      state.data = action.payload
      state.status = 'available'
    },
  },
})

export { articlesKeywordsService }
export { articlesKeywordsSelectors }
