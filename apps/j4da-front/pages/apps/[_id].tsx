import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { AppForm } from '../../forms/AppForm'
import { Main } from '../../templates/Main'
import { IApp, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const App = (props: IApp) => {
  return (
    <Main>
      <AppForm props={props} />
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await res.json()

  return {
    paths: apps.map((app) => ({
      params: {
        _id: app._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IApp, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/apps/${params._id}`)
  const app: IApp = await res.json()

  return {
    props: {
      _id: app._id,
      title: app.title,
      description: app.description,
    },
  }
}

export default App
