import { PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as categorySelectors from './selectors'

const initialState = {
  data: undefined as ICategory[],
  available: false,
  fetching: false,
}

const categoryService = createGenericSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state) => {
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

export { categoryService }
export { categorySelectors }
