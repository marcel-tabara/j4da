import { Spinner } from 'react-bootstrap'
import { Apps } from '../components/Apps'
import { useSelectors } from '../hooks/useSelectors'
import { Main } from '../templates/Main'

const AppsList = () => {
  const { apps, appsAvailable, appsFetching } = useSelectors({})
  const pagination = {}
  return (
    <Main>
      {!appsAvailable || appsFetching ? (
        <Spinner animation="grow" />
      ) : (
        <Apps apps={apps} pagination={pagination} />
      )}
    </Main>
  )
}

export default AppsList
