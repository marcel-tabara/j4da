import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const keywords = (state: RootState) => state.keywordService

export const keywordsSelector = createSelector(keywords, (items) => items)

export const keywordsByArticleSelector = createSelector(
  keywords,
  (items) => (id: string) => {
    return (items.data || []).filter(
      (e: { article: { [x: string]: string } }) => e.article['_id'] === id
    )
  }
)
