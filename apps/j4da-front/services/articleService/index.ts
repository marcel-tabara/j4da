import { createGenericSlice } from '../utils/genericSlice'
import * as articleSelectors from './selectors'

const initialState = {
  data: undefined,
  available: false,
  fetching: false,
}

const articleService = createGenericSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles: (state) => {
      state.fetching = true
    },
  },
})

export { articleService }
export { articleSelectors }
