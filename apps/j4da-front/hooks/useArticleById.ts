import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleByIdSelectors, articleByIdService } from '../services'
import { IArticle } from '../utils/types'

export const useArticleById = (
  _id: string
): {
  articleById: IArticle
  articleByIdAvailable: boolean
  articleByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: articleById,
    available: articleByIdAvailable,
    fetching: articleByIdFetching,
  } = useSelector(articleByIdSelectors.articleByIdSelector)

  useEffect(() => {
    _id &&
      !articleByIdAvailable &&
      !articleByIdFetching &&
      dispatch(articleByIdService.actions.getArticleById(_id))
  }, [_id, articleByIdAvailable, dispatch, articleByIdFetching])

  useEffect(() => {
    return () => {
      dispatch(articleByIdService.actions.reset())
    }
  }, [dispatch])

  return {
    articleById,
    articleByIdAvailable,
    articleByIdFetching,
  }
}
