import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { categoryByIdService } from '../services'
import { ICategory } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useCategoryById = (
  _id: string
): {
  categoryById: ICategory
  categoryByIdAvailable: boolean
  categoryByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const { categoryById, categoryByIdAvailable, categoryByIdFetching } =
    useSelectors()

  useEffect(() => {
    _id &&
      !categoryByIdAvailable &&
      !categoryByIdFetching &&
      dispatch(categoryByIdService.actions.getCategoryById(_id))
  }, [_id, categoryByIdAvailable, dispatch, categoryByIdFetching])

  return {
    categoryById,
    categoryByIdAvailable,
    categoryByIdFetching,
  }
}
