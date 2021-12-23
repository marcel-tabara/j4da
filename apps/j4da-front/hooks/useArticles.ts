import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleSelectors, articleService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { IArticles } from '../utils/types'

export const useArticles = (): { articles: IArticles; status: StatusType } => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(articleSelectors.articlesSelector)

  useEffect(() => {
    !status && dispatch(articleService.actions.getArticles())
  }, [dispatch, status])

  return {
    articles: data,
    status,
  }
}
