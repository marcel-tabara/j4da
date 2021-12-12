import { GetStaticProps } from 'next'
import React from 'react'
import { AppForm } from '../../forms/AppForm'
import { Main } from '../../templates/Main'
import { IApp, IUrl } from '../../types'

const App = (props: IApp) => {
  return (
    <Main>
      <AppForm props={props} />
    </Main>
  )
}

export const getStaticProps: GetStaticProps<IApp, IUrl> = async () => {
  return {
    props: {
      _id: '',
      keyOverride: '',
      url: '',
      title: '',
      images: '',
      section: '',
      keywords: '',
      dateCreated: '',
      datePublished: '',
      dateModified: '',
      authorName: '',
      description: '',
      body: '',
      publisherName: '',
      publisherLogo: '',
    },
  }
}

export default App
