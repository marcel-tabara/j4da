import { useSelector } from 'react-redux'
import {
  alertSelectors,
  appSelectors,
  articleSelectors,
  categorySelectors,
  keywordSelectors,
} from '../services'

export const useSelectors = () => {
  const allArticles = useSelector(articleSelectors.articlesSelector)
  const allApps = useSelector(appSelectors.appsSelector)
  const allKeywords = useSelector(keywordSelectors.keywordsSelector)
  const allCategories = useSelector(categorySelectors.categoriesSelector)
  const articleById = useSelector(articleSelectors.articleByIdSelector)
  const alerts = useSelector(alertSelectors.alertsSelector)

  return {
    allArticles,
    allApps,
    allKeywords,
    allCategories,
    articleById,
    alerts,
  }
}
