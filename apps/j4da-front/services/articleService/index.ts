import { PayloadAction } from '@reduxjs/toolkit'
import { IArticle, IArticles, IArticlesKeywords } from '../../utils/types'
import { createGenericSlice } from '../utils/genericSlice'
import * as articleSelectors from './selectors'

const initialState = {
  data: {
    articles: {
      data: undefined as IArticles,
      status: undefined,
    },
    articleKeywords: {
      data: undefined as IArticlesKeywords,
      status: undefined,
    },
    extractedKeywords: {
      data: undefined as string[],
      status: undefined,
    },
    articleById: {
      data: undefined as IArticle,
      status: undefined,
    },
  },
}

const articleService = createGenericSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles: (state) => {
      state.data.articles.status = 'loading'
    },
    setArticles: (state, action: PayloadAction<IArticles>) => {
      state.data.articles.data = action.payload
      state.data.articles.status = 'available'
    },
    getArticleById: (state, action: PayloadAction<string>) => {
      state.data.articleById.status = 'loading'
    },
    setArticleById: (state, action) => {
      state.data.articleById.data = action.payload
      state.data.articleById.status = 'available'
    },
    getArticleKeywords: (state) => {
      state.data.articleKeywords.status = 'loading'
    },
    setArticleKeywords: (state, action: PayloadAction<IArticlesKeywords>) => {
      state.data.articleKeywords.data = action.payload
      state.data.articleKeywords.status = 'available'
    },
    setExtractedKeywords: (state, action) => {
      state.data.extractedKeywords.data = action.payload
      state.data.extractedKeywords.status = 'available'
    },
    extractKeywords: (state, action) => {
      state.data.extractedKeywords.status = 'loading'
    },
  },
})

export { articleService }
export { articleSelectors }
