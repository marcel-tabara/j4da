import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesKeywordsSelectors, articlesKeywordsService } from '../services'
import { IArticlesKeywords } from '../utils/types'

export const useArticlesKeywords = (
  text: string
): {
  articlesKeywords: IArticlesKeywords
  articlesKeywordsAvailable: boolean
  articlesKeywordsFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: articlesKeywords,
    available: articlesKeywordsAvailable,
    fetching: articlesKeywordsFetching,
  } = useSelector(articlesKeywordsSelectors.articleKeywordsSelector)

  useEffect(() => {
    text &&
      !articlesKeywordsAvailable &&
      !articlesKeywordsFetching &&
      dispatch(articlesKeywordsService.actions.getArticlesKeywords(text))
  }, [articlesKeywordsAvailable, dispatch, articlesKeywordsFetching, text])

  return {
    articlesKeywords,
    articlesKeywordsAvailable,
    articlesKeywordsFetching,
  }
}
