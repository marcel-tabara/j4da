import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleSelectors, articleService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { IArticlesKeywords } from '../utils/types'

export const useArticlesKeywords = (
  text: string
): { articlesKeywords: IArticlesKeywords; status: StatusType } => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(articleSelectors.articleKeywordsSelector)

  useEffect(() => {
    !status && dispatch(articleService.actions.getArticleKeywords(text))
  }, [dispatch, status, text])

  return {
    articlesKeywords: data,
    status,
  }
}
