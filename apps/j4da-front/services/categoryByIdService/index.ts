import { PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as categoryByIdSelectors from './selectors'

const initialState = {
  data: undefined as ICategory,
  available: false,
  fetching: false,
}

const categoryByIdService = createGenericSlice({
  name: 'categoryById',
  initialState,
  reducers: {
    getCategoryById: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
    createCategory: (state, action: PayloadAction<ICategory>) => {
      state.fetching = true
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      state.fetching = true
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
  },
})

export { categoryByIdService }
export { categoryByIdSelectors }
