import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { keywordByIdService } from '../services'
import { IKeyword } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useKeywordById = (
  _id: string
): {
  keywordById: IKeyword
  keywordByIdAvailable: boolean
  keywordByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const { keywordById, keywordByIdAvailable, keywordByIdFetching } =
    useSelectors()

  useEffect(() => {
    _id &&
      !keywordByIdAvailable &&
      !keywordByIdFetching &&
      dispatch(keywordByIdService.actions.getKeywordById(_id))
  }, [_id, keywordByIdAvailable, dispatch, keywordByIdFetching])

  return {
    keywordById,
    keywordByIdAvailable,
    keywordByIdFetching,
  }
}
