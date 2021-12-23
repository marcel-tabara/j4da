import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesKeywordsSelectors, articlesKeywordsService } from '../services'
import { IArticlesKeywords } from '../utils/types'

export const useArticlesKeywords = (
  text: string
): {
  articlesKeywords: IArticlesKeywords
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { data, available, fetching } = useSelector(
    articlesKeywordsSelectors.articleKeywordsSelector
  )

  useEffect(() => {
    !available &&
      !fetching &&
      dispatch(articlesKeywordsService.actions.getArticlesKeywords(text))
  }, [available, dispatch, fetching, text])

  return {
    articlesKeywords: data,
    available,
    fetching,
  }
}
