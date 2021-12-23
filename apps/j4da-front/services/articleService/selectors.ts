import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const articles = (state: RootState) => state.articleService
export const articlesSelector = createSelector(articles, (items) => items)
