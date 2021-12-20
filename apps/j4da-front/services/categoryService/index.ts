import { createSlice } from '@reduxjs/toolkit'

const categoryService = createSlice({
  name: 'articles',
  initialState: {
    category: [],
  },
  reducers: {
    getCcategories: () => undefined,
    setCategories: (state, action) => {
      state.category = action.payload
    },
  },
})

export { categoryService }
