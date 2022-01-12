import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subcategorySelectors, subcategoryService } from '../services'
import { ISubCategory } from '../utils/types'

export const useSubcategories = (): {
  subcategories: ISubCategory[]
  subcategoriesAvailable: boolean
  subcategoriesFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: subcategories,
    available: subcategoriesAvailable,
    fetching: subcategoriesFetching,
  } = useSelector(subcategorySelectors.subcategoriesSelector)

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
