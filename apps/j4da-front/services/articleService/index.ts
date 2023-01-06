import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articleSelectors from './selectors'

const initialState = {
  data: undefined,
  available: false,
  fetching: false,
}

const articleService = createGenericSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles: (state) => {
      state.fetching = true
    },
    createArticle: (state, action: PayloadAction<IArticle>) => {
      state.fetching = true
    },
    updateArticle: (state, action: PayloadAction<IArticle>) => {
      state.fetching = true
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
    generateArticles: (state) => {
      state.fetching = true
    },
    generateContentByApp: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
  },
})

export { articleService }
export { articleSelectors }
