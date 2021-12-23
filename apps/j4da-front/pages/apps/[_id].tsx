import React from 'react'
import { AppForm } from '../../forms/AppForm'
import { useApps } from '../../hooks/useApps'
import { Main } from '../../templates/Main'

const App = () => {
  const { apps, status } = useApps()
  return <Main>{status === 'available' && <AppForm props={apps} />}</Main>
}

export default App
