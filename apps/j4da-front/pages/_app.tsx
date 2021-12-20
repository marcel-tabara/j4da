import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/index'
import '../styles/main.css'

const j4daStore = store()

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={j4daStore}>
      <Component {...pageProps} />
    </Provider>
  </>
)

export default MyApp
