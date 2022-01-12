import { PayloadAction } from '@reduxjs/toolkit'
import { ISubCategory } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as subcategoryByIdSelectors from './selectors'

const initialState = {
  data: undefined as ISubCategory,
  available: false,
  fetching: false,
}

const subcategoryByIdService = createGenericSlice({
  name: 'subcategoryById',
  initialState,
  reducers: {
    getSubcategoryById: (state, action: PayloadAction<string>) => {
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

export { subcategoryByIdService }
export { subcategoryByIdSelectors }
