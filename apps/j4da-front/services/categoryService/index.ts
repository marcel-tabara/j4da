import { PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as categorySelectors from './selectors'

const initialState = {
  data: undefined as ICategory[],
  status: undefined,
}

const categoryService = createGenericSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state) => {
      state.status = 'loading'
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.data = action.payload
      state.status = 'available'
    },
    createCategory: (state, action: PayloadAction<ICategory>) => {
      state.status = 'loading'
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      state.status = 'loading'
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.status = 'loading'
    },
  },
})

export { categoryService }
export { categorySelectors }
