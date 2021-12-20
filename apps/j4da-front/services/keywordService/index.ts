import { createSlice } from '@reduxjs/toolkit'

const keywordService = createSlice({
  name: 'articles',
  initialState: {
    keywords: [],
  },
  reducers: {
    getKeywords: () => undefined,
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },
  },
})

export { keywordService }
