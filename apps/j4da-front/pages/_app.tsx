import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { AlertWrapper } from '../components/AlertWrapper'
import store from '../store/index'
import '../styles/main.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store}>
      <AlertWrapper />
      <Component {...pageProps} />
    </Provider>
  </>
)

export default MyApp
