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
    data: articles,
    available: articlesAvailable,
    fetching: articlesFetching,
  } = useSelector(articleSelectors.articlesSelector)

  const {
    data: apps,
    available: appsAvailable,
    fetching: appsFetching,
  } = useSelector(appSelectors.appsSelector)
  const {
    data: appById,
    available: appByIdAvailable,
    fetching: appByIdFetching,
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
    data: categories,
    available: categoriesAvailable,
    fetching: categoriesFetching,
  } = useSelector(categorySelectors.categoriesSelector)

  const {
    data: subcategoryById,
    available: subcategoryByIdAvailable,
    fetching: subcategoryByIdFetching,
  } = useSelector(subcategoryByIdSelectors.subcategoryByIdSelector)

  const {
    data: subcategories,
    available: subcategoriesAvailable,
    fetching: subcategoriesFetching,
  } = useSelector(subcategorySelectors.subcategoriesSelector)

  const {
    data: alert,
    available: alertAvailable,
    fetching: alertFetching,
  } = useSelector(alertSelectors.alertSelector)

  return {
    articles,
    articlesAvailable,
    articlesFetching,
    articleById,
    articleByIdAvailable,
    articleByIdFetching,
    //
    apps,
    appsAvailable,
    appsFetching,
    appById,
    appByIdAvailable,
    appByIdFetching,
    //
    keywords,
    keywordsAvailable,
    keywordsFetching,
    keywordById,
    keywordByIdAvailable,
    keywordByIdFetching,
    keywordsByArticleId,
    //
    categories,
    categoriesAvailable,
    categoriesFetching,
    categoryById,
    categoryByIdAvailable,
    categoryByIdFetching,
    //
    subcategories,
    subcategoriesAvailable,
    subcategoriesFetching,
    subcategoryById,
    subcategoryByIdAvailable,
    subcategoryByIdFetching,
    //
    alert,
    alertAvailable,
    alertFetching,
    //
    extractedKeywords,
    extractedKeywordsAvailable,
    extractedKeywordsFetching,
  }
}
