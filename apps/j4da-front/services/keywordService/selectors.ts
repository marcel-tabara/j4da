import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const keywords = (state: RootState) => state.keywordService

export const keywordsSelector = createSelector(keywords, (items) => items)
