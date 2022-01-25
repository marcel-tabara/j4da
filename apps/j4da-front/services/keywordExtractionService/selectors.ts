import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const keywords = (state: RootState) => state.keywordExtractionService

export const keywordExtractionSelector = createSelector(
  keywords,
  (items) => items
)
