import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import React from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
