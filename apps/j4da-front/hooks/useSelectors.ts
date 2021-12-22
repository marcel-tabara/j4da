import { useSelector } from 'react-redux'
import {
  alertSelectors,
  appSelectors,
  articleSelectors,
  categorySelectors,
  keywordSelectors,
} from '../services'

export const useSelectors = () => {
  const { data: allArticles } = useSelector(articleSelectors.articlesSelector)
  const { data: allApps } = useSelector(appSelectors.appsSelector)
  const { data: allKeywords } = useSelector(keywordSelectors.keywordsSelector)
  const { data: allCategories } = useSelector(
    categorySelectors.categoriesSelector
  )
  const { data: articleById } = useSelector(
    articleSelectors.articleByIdSelector
  )
  const alerts = useSelector(alertSelectors.alertsSelector)

  const { data: extractedKeywords } = useSelector(
    articleSelectors.extractedKeywordsSelector
  )

  return {
    allArticles,
    allApps,
    allKeywords,
    allCategories,
    articleById,
    extractedKeywords,
    alerts,
  }
}
