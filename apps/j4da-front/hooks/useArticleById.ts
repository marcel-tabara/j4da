import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { articleByIdService } from '../services'
import { IArticle } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useArticleById = (
  _id: string
): {
  articleById: IArticle
  articleByIdAvailable: boolean
  articleByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const { articleById, articleByIdAvailable, articleByIdFetching } =
    useSelectors()

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
