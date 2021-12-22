import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categorySelectors, categoryService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { ICategory } from '../utils/types'

export const useCategories = (): {
  categories: ICategory[]
  status: StatusType
} => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(categorySelectors.categoriesSelector)

  useEffect(() => {
    !status && dispatch(categoryService.actions.getCategories())
  }, [dispatch, status])

  return {
    categories: data,
    status,
  }
}
