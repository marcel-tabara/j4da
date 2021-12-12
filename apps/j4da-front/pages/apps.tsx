import { GetStaticProps } from 'next'
import React from 'react'
import { Apps } from '../components/Apps'
import { Main } from '../templates/Main'
import { IApp, IAppsProps } from '../types'
import { Config } from '../utils/Config'
import { BASE_URL } from '../utils/constants'

const AppsList = (props: IAppsProps) => (
  <Main>
    <Apps apps={props.apps} pagination={props.pagination} />
  </Main>
)

export const getStaticProps: GetStaticProps<IAppsProps> = async () => {
  const res = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await res.json()
  const pagination = {}

  return {
    props: {
      apps: apps.slice(0, Config.pagination_size),
      pagination,
    },
  }
}

export default AppsList
