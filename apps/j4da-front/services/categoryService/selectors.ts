import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const categories = (state: RootState) => state.categoryService

export const categoriesSelector = createSelector(categories, (items) => items)
