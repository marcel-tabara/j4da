import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categorySelectors, categoryService } from '../services'
import { ICategory } from '../utils/types'

export const useCategories = (): {
  categories: ICategory[]
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { data, available, fetching } = useSelector(
    categorySelectors.categoriesSelector
  )

  useEffect(() => {
    !available && !fetching && dispatch(categoryService.actions.getCategories())
  }, [available, dispatch, fetching])

  return {
    categories: data,
    available,
    fetching,
  }
}
