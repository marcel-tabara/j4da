import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleByIdSelectors, articleByIdService } from '../services'
import { IArticle } from '../utils/types'

export const useArticleById = (
  _id: string
): {
  articleById: IArticle
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { data, available, fetching } = useSelector(
    articleByIdSelectors.articleByIdSelector
  )

  useEffect(() => {
    !available &&
      !fetching &&
      dispatch(articleByIdService.actions.getArticleById(_id))
  }, [_id, available, dispatch, fetching])

  return {
    articleById: data,
    available,
    fetching,
  }
}
