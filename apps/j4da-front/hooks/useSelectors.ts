import { useSelector } from 'react-redux'
import {
  alertSelectors,
  appByIdSelectors,
  appSelectors,
  articleByIdSelectors,
  articleSelectors,
  categoryByIdSelectors,
  categorySelectors,
  extractedKeywordsSelectors,
  keywordByIdSelectors,
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
    data: appsById,
    available: appsByIdAvailable,
    fetching: appsByIdFetching,
  } = useSelector(appByIdSelectors.appByIdSelector)

  const {
    data: allKeywords,
    available: allKeywordsAvailable,
    fetching: allKeywordsFetching,
  } = useSelector(keywordSelectors.keywordsSelector)

  const {
    data: keywordById,
    available: keywordByIdAvailable,
    fetching: keywordByIdFetching,
  } = useSelector(keywordByIdSelectors.keywordByIdSelector)

  const {
    data: categoryById,
    available: categoryByIdAvailable,
    fetching: categoryByIdFetching,
  } = useSelector(categoryByIdSelectors.categoryByIdSelector)

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
    articleById,
    articleByIdAvailable,
    articleByIdFetching,
    //
    allApps,
    allAppsAvailable,
    allAppsFetching,
    appsById,
    appsByIdAvailable,
    appsByIdFetching,
    //
    allKeywords,
    allKeywordsAvailable,
    allKeywordsFetching,
    keywordById,
    keywordByIdAvailable,
    keywordByIdFetching,
    //
    allCategories,
    allCategoriesAvailable,
    allCategoriesFetching,
    categoryById,
    categoryByIdAvailable,
    categoryByIdFetching,
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
