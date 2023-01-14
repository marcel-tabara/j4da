import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { articleService } from '../services'
import { IArticles } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useArticles = (): {
  articles: IArticles
  articlesAvailable: boolean
  articlesFetching: boolean
} => {
  const dispatch = useDispatch()
  const { articles, articlesAvailable, articlesFetching } = useSelectors()

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
