import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const articleKeywords = (state: RootState) => state.articlesKeywordsService

export const articleKeywordsSelector = createSelector(
  articleKeywords,
  (items) => items
)
