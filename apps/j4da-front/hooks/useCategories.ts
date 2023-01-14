import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { categoryService } from '../services'
import { ICategory } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useCategories = (): {
  categories: ICategory[]
  categoriesAvailable: boolean
  categoriesFetching: boolean
} => {
  const dispatch = useDispatch()
  const { categories, categoriesAvailable, categoriesFetching } = useSelectors()

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
