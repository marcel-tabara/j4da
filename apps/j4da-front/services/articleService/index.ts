import { createSlice } from '@reduxjs/toolkit'

const articleService = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
  },
  reducers: {
    getArticles: () => undefined,
    setArticles: (state, action) => {
      state.articles = action.payload
    },
  },
})

export { articleService }
