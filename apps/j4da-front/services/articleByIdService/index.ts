import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articleByIdSelectors from './selectors'

const initialState = {
  data: undefined as IArticle,
  available: false,
  fetching: false,
}

const articleByIdService = createGenericSlice({
  name: 'articleById',
  initialState,
  reducers: {
    getArticleById: (state, action: PayloadAction<string>) => {
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
  },
})

export { articleByIdService }
export { articleByIdSelectors }
