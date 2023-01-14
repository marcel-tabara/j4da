import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { AlertWrapper } from '../components/AlertWrapper'
import { useApps } from '../hooks/useApps'
import { useArticles } from '../hooks/useArticles'
import { useCategories } from '../hooks/useCategories'
import { useKeywords } from '../hooks/useKeywords'
import { useSubcategories } from '../hooks/useSubcategories'
import store from '../store/index'
import '../styles/main.css'

const Preloader = () => {
  useApps()
  useArticles()
  useKeywords()
  useCategories()
  useSubcategories()
  return null
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Preloader />
      <AlertWrapper />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
