import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { keywordSelectors, keywordService } from '../services'
import { IKeyword } from '../utils/types'

export const useKeywords = (): {
  keywords: IKeyword[]
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { data, available, fetching } = useSelector(
    keywordSelectors.keywordsSelector
  )

  useEffect(() => {
    !available && !fetching && dispatch(keywordService.actions.getKeywords())
  }, [available, dispatch, fetching])

  return {
    keywords: data,
    available,
    fetching,
  }
}
