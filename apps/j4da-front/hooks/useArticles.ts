import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleSelectors, articleService } from '../services'
import { IArticles } from '../utils/types'

export const useArticles = (): {
  articles: IArticles
  articlesAvailable: boolean
  articlesFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: articles,
    available: articlesAvailable,
    fetching: articlesFetching,
  } = useSelector(articleSelectors.articlesSelector)

  useEffect(() => {
    !articlesAvailable &&
      !articlesFetching &&
      dispatch(articleService.actions.getArticles())
  }, [articlesAvailable, dispatch, articlesFetching])

  return {
    articles,
    articlesAvailable,
    articlesFetching,
  }
}
