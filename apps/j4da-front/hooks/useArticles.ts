import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleSelectors, articleService } from '../services'
import { IArticles } from '../utils/types'

export const useArticles = (): {
  articles: IArticles
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { data, available, fetching } = useSelector(
    articleSelectors.articlesSelector
  )

  useEffect(() => {
    !available && !fetching && dispatch(articleService.actions.getArticles())
  }, [available, dispatch, fetching])

  return {
    articles: data,
    available,
    fetching,
  }
}
