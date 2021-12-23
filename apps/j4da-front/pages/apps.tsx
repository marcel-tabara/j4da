import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Apps } from '../components/Apps'
import { useApps } from '../hooks/useApps'
import { Main } from '../templates/Main'

const AppsList = () => {
  const { apps, status } = useApps()
  const pagination = {}
  return (
    <Main>
      {status !== 'available' ? (
        <Spinner animation="grow" />
      ) : (
        <Apps apps={apps} pagination={pagination} />
      )}
    </Main>
  )
}

export default AppsList
