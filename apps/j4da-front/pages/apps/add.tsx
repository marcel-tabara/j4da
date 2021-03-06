import React from 'react'
import { AppForm } from '../../forms/AppForm'
import { Main } from '../../templates/Main'
import { IApp } from '../../utils/types'

const App = () => {
  const appById = { dateCreated: new Date().toISOString() } as IApp
  return (
    <Main>
      <AppForm appById={appById} />
    </Main>
  )
}

export default App
