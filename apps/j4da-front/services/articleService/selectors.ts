import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const articles = (state: RootState) => state.articleService.data.articles
const articleById = (state: RootState) => state.articleService.data.articleById
const articleKeywords = (state: RootState) =>
  state.articleService.data.articleKeywords
const extractedKeywords = (state: RootState) =>
  state.articleService.data.extractedKeywords

export const articlesSelector = createSelector(articles, (items) => items)
export const articleByIdSelector = createSelector(articleById, (items) => items)
export const articleKeywordsSelector = createSelector(
  articleKeywords,
  (items) => items
)
export const extractedKeywordsSelector = createSelector(
  extractedKeywords,
  (items) => items
)
