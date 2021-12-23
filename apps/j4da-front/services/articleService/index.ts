import { PayloadAction } from '@reduxjs/toolkit'
import { IArticles } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articleSelectors from './selectors'

const initialState = {
  data: undefined,
  status: undefined,
}

const articleService = createGenericSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles: (state) => {
      state.status = 'loading'
    },
    setArticles: (state, action: PayloadAction<IArticles>) => {
      state.data = action.payload
      state.status = 'available'
    },
  },
})

export { articleService }
export { articleSelectors }
