import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const subcategoryById = (state: RootState) => state.subcategoryByIdService
export const subcategoryByIdSelector = createSelector(
  subcategoryById,
  (items) => items
)
