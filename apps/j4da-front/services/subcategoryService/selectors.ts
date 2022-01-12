import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const subcategories = (state: RootState) => state.subcategoryService

export const subcategoriesSelector = createSelector(
  subcategories,
  (items) => items
)
