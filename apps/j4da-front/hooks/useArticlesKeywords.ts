import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesKeywordsSelectors, articlesKeywordsService } from '../services'
import { IArticlesKeyword } from '../utils/types'

export const useArticlesKeywords = (): {
  articlesKeywords: IArticlesKeyword[]
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
    !articlesKeywordsAvailable &&
      !articlesKeywordsFetching &&
      dispatch(articlesKeywordsService.actions.getArticlesKeywords())
  }, [articlesKeywordsAvailable, dispatch, articlesKeywordsFetching])

  return {
    articlesKeywords,
    articlesKeywordsAvailable,
    articlesKeywordsFetching,
  }
}
