import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleByIdSelectors, articleByIdService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { IArticle } from '../utils/types'

export const useArticleById = (
  _id: string
): {
  articleById: IArticle
  status: StatusType
} => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(articleByIdSelectors.articleByIdSelector)

  useEffect(() => {
    !status && dispatch(articleByIdService.actions.getArticleById(_id))
  }, [_id, dispatch, status])

  return {
    articleById: data,
    status,
  }
}
