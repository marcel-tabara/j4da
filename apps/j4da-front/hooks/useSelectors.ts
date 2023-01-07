import { useSelector } from 'react-redux'
import {
  alertSelectors,
  appByIdSelectors,
  appSelectors,
  articleByIdSelectors,
  articleSelectors,
  categoryByIdSelectors,
  categorySelectors,
  keywordByIdSelectors,
  keywordExtractionSelectors,
  keywordSelectors,
  subcategoryByIdSelectors,
  subcategorySelectors,
} from '../services'

interface IUseSelectorsProps {
  articleId?: string
}

export const useSelectors = (props: IUseSelectorsProps = {}) => {
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
    data: keywords,
    available: keywordsAvailable,
    fetching: keywordsFetching,
  } = useSelector(keywordSelectors.keywordsSelector)

  const {
    data: extractedKeywords,
    available: extractedKeywordsAvailable,
    fetching: extractedKeywordsFetching,
  } = useSelector(keywordExtractionSelectors.keywordExtractionSelector)

  const {
    data: keywordById,
    available: keywordByIdAvailable,
    fetching: keywordByIdFetching,
  } = useSelector(keywordByIdSelectors.keywordByIdSelector)

  const keywordsByArticleId = useSelector(
    keywordSelectors.keywordsByArticleSelector
  )(props?.articleId)

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
    data: subcategoryById,
    available: subcategoryByIdAvailable,
    fetching: subcategoryByIdFetching,
  } = useSelector(subcategoryByIdSelectors.subcategoryByIdSelector)

  const {
    data: allSubcategories,
    available: allSubcategoriesAvailable,
    fetching: allSubcategoriesFetching,
  } = useSelector(subcategorySelectors.subcategoriesSelector)

  const {
    data: allAlerts,
    available: allAlertsAvailable,
    fetching: allAlertsFetching,
  } = useSelector(alertSelectors.alertsSelector)

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
    keywords,
    keywordsAvailable,
    keywordsFetching,
    keywordById,
    keywordByIdAvailable,
    keywordByIdFetching,
    keywordsByArticleId,
    //
    allCategories,
    allCategoriesAvailable,
    allCategoriesFetching,
    categoryById,
    categoryByIdAvailable,
    categoryByIdFetching,
    //
    allSubcategories,
    allSubcategoriesAvailable,
    allSubcategoriesFetching,
    subcategoryById,
    subcategoryByIdAvailable,
    subcategoryByIdFetching,
    //
    allAlerts,
    allAlertsAvailable,
    allAlertsFetching,
    //
    extractedKeywords,
    extractedKeywordsAvailable,
    extractedKeywordsFetching,
  }
}
