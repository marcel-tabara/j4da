import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { keywordService } from '../services'
import { IKeyword } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useKeywords = (): {
  keywords: IKeyword[]
  keywordsAvailable: boolean
  keywordsFetching: boolean
} => {
  const dispatch = useDispatch()
  const { keywords, keywordsAvailable, keywordsFetching } = useSelectors()

  useEffect(() => {
    !keywordsAvailable &&
      !keywordsFetching &&
      dispatch(keywordService.actions.getKeywords())
  }, [keywordsAvailable, dispatch, keywordsFetching])

  return {
    keywords,
    keywordsAvailable,
    keywordsFetching,
  }
}
