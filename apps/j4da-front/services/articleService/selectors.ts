import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const articles = (state: RootState) => state.articleService.data.articles.data
const articleById = (state: RootState) =>
  state.articleService.data.articleById.data

export const articlesSelector = createSelector(articles, (items) => items)
export const articleByIdSelector = createSelector(articleById, (items) => items)
