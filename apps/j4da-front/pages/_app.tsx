import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import React from 'react'
import '../styles/main.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
