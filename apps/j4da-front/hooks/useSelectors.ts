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
  const {
    data: articleById,
    available: articleByIdAvailable,
    fetching: articleByIdFetching,
  } = useSelector(articleByIdSelectors.articleByIdSelector)

  const {
    data: allArticles,
    available: allArticlesAvailable,
    fetching: allArticlesFetching,
  } = useSelector(articleSelectors.articlesSelector)
  const {
    data: allApps,
    available: allAppsAvailable,
    fetching: allAppsFetching,
  } = useSelector(appSelectors.appsSelector)

  const {
    data: allKeywords,
    available: allKeywordsAvailable,
    fetching: allKeywordsFetching,
  } = useSelector(keywordSelectors.keywordsSelector)

  const {
    data: allCategories,
    available: allCategoriesAvailable,
    fetching: allCategoriesFetching,
  } = useSelector(categorySelectors.categoriesSelector)

  const {
    data: allAlerts,
    available: allAlertsAvailable,
    fetching: allAlertsFetching,
  } = useSelector(alertSelectors.alertsSelector)

  const {
    data: extractedKeywords,
    available: extractedKeywordsAvailable,
    fetching: extractedKeywordsFetching,
  } = useSelector(extractedKeywordsSelectors.extractedKeywordsSelector)

  return {
    allArticles,
    allArticlesAvailable,
    allArticlesFetching,
    //
    allApps,
    allAppsAvailable,
    allAppsFetching,
    //
    allKeywords,
    allKeywordsAvailable,
    allKeywordsFetching,
    //
    allCategories,
    allCategoriesAvailable,
    allCategoriesFetching,
    //
    articleById,
    articleByIdAvailable,
    articleByIdFetching,
    //
    extractedKeywords,
    extractedKeywordsAvailable,
    extractedKeywordsFetching,
    //
    allAlerts,
    allAlertsAvailable,
    allAlertsFetching,
  }
}
