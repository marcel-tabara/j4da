import React from 'react'
import { AppForm } from '../../forms/AppForm'
import { Main } from '../../templates/Main'
import { IApp } from '../../utils/types'

const App = () => {
  const props = {} as IApp
  return (
    <Main>
      <AppForm props={props} />
    </Main>
  )
}

export default App
