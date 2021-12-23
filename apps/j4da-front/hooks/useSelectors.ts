import { useSelector } from 'react-redux'
import {
  alertSelectors,
  appSelectors,
  articleByIdSelectors,
  articleSelectors,
  categorySelectors,
  extractedKeywordsSelectors,
  keywordSelectors,
} from '../services'

export const useSelectors = () => {
  const { data: articleById, status: articleByIdStatus } = useSelector(
    articleByIdSelectors.articleByIdSelector
  )
  const { data: allArticles, status: allArticlesStatus } = useSelector(
    articleSelectors.articlesSelector
  )
  const { data: allApps, status: allAppsStatus } = useSelector(
    appSelectors.appsSelector
  )
  const { data: allKeywords, status: allKeywordsStatus } = useSelector(
    keywordSelectors.keywordsSelector
  )
  const { data: allCategories, status: allCategoriesStatus } = useSelector(
    categorySelectors.categoriesSelector
  )

  const alerts = useSelector(alertSelectors.alertsSelector)

  const { data: extractedKeywords, status: extractedKeywordsStatus } =
    useSelector(extractedKeywordsSelectors.extractedKeywordsSelector)

  return {
    allArticles,
    allArticlesStatus,
    allApps,
    allAppsStatus,
    allKeywords,
    allKeywordsStatus,
    allCategories,
    allCategoriesStatus,
    articleById,
    articleByIdStatus,
    extractedKeywords,
    extractedKeywordsStatus,
    alerts,
  }
}
