import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { keywordSelectors, keywordService } from '../services'
import { IKeyword } from '../utils/types'

export const useKeywords = (): {
  keywords: IKeyword[]
  keywordsAvailable: boolean
  keywordsFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: keywords,
    available: keywordsAvailable,
    fetching: keywordsFetching,
  } = useSelector(keywordSelectors.keywordsSelector)

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
