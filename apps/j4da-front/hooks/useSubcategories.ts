import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { subcategoryService } from '../services'
import { ISubCategory } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useSubcategories = (): {
  subcategories: ISubCategory[]
  subcategoriesAvailable: boolean
  subcategoriesFetching: boolean
} => {
  const dispatch = useDispatch()
  const { subcategories, subcategoriesAvailable, subcategoriesFetching } =
    useSelectors()

  useEffect(() => {
    !subcategoriesAvailable &&
      !subcategoriesFetching &&
      dispatch(subcategoryService.actions.getSubcategories())
  }, [subcategoriesAvailable, dispatch, subcategoriesFetching])

  return {
    subcategories,
    subcategoriesAvailable,
    subcategoriesFetching,
  }
}
