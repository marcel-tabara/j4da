import { createGenericSlice } from '../utils/genericSlice'
import * as extractedKeywordsSelectors from './selectors'

const initialState = {
  data: undefined as string[],
  available: false,
  fetching: false,
}

const extractedKeywordsService = createGenericSlice({
  name: 'extractedKeywords',
  initialState,
  reducers: {
    extractKeywords: (state, action) => {
      state.fetching = true
    },
  },
})

export { extractedKeywordsService }
export { extractedKeywordsSelectors }
