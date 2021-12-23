import { createGenericSlice } from '../utils/genericSlice'
import * as extractedKeywordsSelectors from './selectors'

const initialState = {
  data: undefined as string[],
  status: undefined,
}

const extractedKeywordsService = createGenericSlice({
  name: 'extractedKeywords',
  initialState,
  reducers: {
    setExtractedKeywords: (state, action) => {
      state.data = action.payload
      state.status = 'available'
    },
    extractKeywords: (state, action) => {
      state.status = 'loading'
    },
  },
})

export { extractedKeywordsService }
export { extractedKeywordsSelectors }
