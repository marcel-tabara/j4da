import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const categoryById = (state: RootState) => state.categoryByIdService
export const categoryByIdSelector = createSelector(
  categoryById,
  (items) => items
)
