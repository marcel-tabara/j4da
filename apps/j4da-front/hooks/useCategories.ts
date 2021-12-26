import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categorySelectors, categoryService } from '../services'
import { ICategory } from '../utils/types'

export const useCategories = (): {
  categories: ICategory[]
  categoriesAvailable: boolean
  categoriesFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: categories,
    available: categoriesAvailable,
    fetching: categoriesFetching,
  } = useSelector(categorySelectors.categoriesSelector)

  useEffect(() => {
    !categoriesAvailable &&
      !categoriesFetching &&
      dispatch(categoryService.actions.getCategories())
  }, [categoriesAvailable, dispatch, categoriesFetching])

  return {
    categories,
    categoriesAvailable,
    categoriesFetching,
  }
}
