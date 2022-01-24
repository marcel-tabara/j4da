import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { keywordService } from '../services'
import { IKeyword } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useKeywordByArticleId = (
  _id?: string
): {
  keywordsByArticleId: IKeyword[]
  keywordsByArticleIdAvailable: boolean
  keywordsByArticleIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    keywordsByArticleId,
    keywordsByArticleIdAvailable,
    keywordsByArticleIdFetching,
  } = useSelectors()

  useEffect(() => {
    _id &&
      !keywordsByArticleIdAvailable &&
      !keywordsByArticleIdFetching &&
      dispatch(keywordService.actions.getKeywordsByArticleId(_id))
  }, [_id, keywordsByArticleIdAvailable, dispatch, keywordsByArticleIdFetching])
  useEffect(() => {
    return () => {
      dispatch(keywordService.actions.reset())
    }
  }, [dispatch])

  return {
    keywordsByArticleId,
    keywordsByArticleIdAvailable,
    keywordsByArticleIdFetching,
  }
}
