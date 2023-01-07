import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { subcategoryByIdService } from '../services'
import { ISubCategory } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useSubcategoryById = (
  _id: string
): {
  subcategoryById: ISubCategory
  subcategoryByIdAvailable: boolean
  subcategoryByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const { subcategoryById, subcategoryByIdAvailable, subcategoryByIdFetching } =
    useSelectors()

  useEffect(() => {
    _id &&
      !subcategoryByIdAvailable &&
      !subcategoryByIdFetching &&
      dispatch(subcategoryByIdService.actions.getSubcategoryById(_id))
  }, [_id, subcategoryByIdAvailable, dispatch, subcategoryByIdFetching])

  return {
    subcategoryById,
    subcategoryByIdAvailable,
    subcategoryByIdFetching,
  }
}
