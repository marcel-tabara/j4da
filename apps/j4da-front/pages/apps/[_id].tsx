import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap'
import { AppForm } from '../../forms/AppForm'
import { useAppById } from '../../hooks/useAppById'
import { Main } from '../../templates/Main'

const App = () => {
  const {
    query: { _id },
  } = useRouter()
  const { appById, appByIdAvailable, appByIdFetching } = useAppById(
    _id as string
  )
  return (
    <Main>
      {!appByIdAvailable || appByIdFetching ? (
        <Spinner animation="grow" />
      ) : (
        <AppForm appById={appById} />
      )}
    </Main>
  )
}

export default App
