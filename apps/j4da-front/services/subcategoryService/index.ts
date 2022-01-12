import { PayloadAction } from '@reduxjs/toolkit'
import { ISubCategory } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as subcategorySelectors from './selectors'

const initialState = {
  data: undefined as ISubCategory[],
  available: false,
  fetching: false,
}

const subcategoryService = createGenericSlice({
  name: 'subcategories',
  initialState,
  reducers: {
    getSubcategories: (state) => {
      state.fetching = true
    },
    createSubcategory: (state, action: PayloadAction<ISubCategory>) => {
      state.fetching = true
    },
    updateSubcategory: (state, action: PayloadAction<ISubCategory>) => {
      state.fetching = true
    },
    deleteSubcategory: (state, action: PayloadAction<string>) => {
      state.fetching = true
    },
  },
})

export { subcategoryService }
export { subcategorySelectors }
