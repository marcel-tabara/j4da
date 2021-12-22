import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { keywordSelectors, keywordService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { IKeyword } from '../utils/types'

export const useKeywords = (): { keywords: IKeyword[]; status: StatusType } => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(keywordSelectors.keywordsSelector)

  useEffect(() => {
    !status && dispatch(keywordService.actions.getKeywords())
  }, [dispatch, status])

  return {
    keywords: data,
    status,
  }
}
