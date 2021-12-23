import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articleByIdSelectors from './selectors'

const initialState = {
  data: undefined as IArticle,
  status: undefined,
}

const articleByIdService = createGenericSlice({
  name: 'articleById',
  initialState,
  reducers: {
    getArticleById: (state, action: PayloadAction<string>) => {
      state.status = 'loading'
    },
    setArticleById: (state, action) => {
      state.data = action.payload
      state.status = 'available'
    },
    createArticle: (state, action: PayloadAction<IArticle>) => {
      state.status = 'loading'
    },
    updateArticle: (state, action: PayloadAction<IArticle>) => {
      state.status = 'loading'
    },
  },
})

export { articleByIdService }
export { articleByIdSelectors }
