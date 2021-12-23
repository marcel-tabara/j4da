import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const extractedKeywords = (state: RootState) => state.extractedKeywordsService
export const extractedKeywordsSelector = createSelector(
  extractedKeywords,
  (items) => items
)
