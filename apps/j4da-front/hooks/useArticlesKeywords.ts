import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesKeywordsSelectors, articlesKeywordsService } from '../services'
import { IArticlesKeyword } from '../utils/types'

interface Props {
  keywords?: string[]
  _id: string
}
export const useArticlesKeywords = ({
  keywords,
  _id,
}: Props): {
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
    keywords?.length > 0 &&
      !articlesKeywordsAvailable &&
      !articlesKeywordsFetching &&
      dispatch(
        articlesKeywordsService.actions.getArticlesKeywords({ keywords, _id })
      )
  }, [
    articlesKeywordsAvailable,
    dispatch,
    articlesKeywordsFetching,
    keywords,
    _id,
  ])

  return {
    articlesKeywords,
    articlesKeywordsAvailable,
    articlesKeywordsFetching,
  }
}
