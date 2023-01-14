import { Spinner } from 'react-bootstrap'
import { Keywords } from '../components/Keywords'
import { useSelectors } from '../hooks/useSelectors'
import { Main } from '../templates/Main'

const KeywordsList = () => {
  const { keywords, keywordsAvailable, keywordsFetching } = useSelectors()
  const pagination = {}

  return (
    <Main>
      {!keywordsAvailable || keywordsFetching ? (
        <Spinner animation="grow" />
      ) : (
        <Keywords keywords={keywords} pagination={pagination} />
      )}
    </Main>
  )
}

export default KeywordsList
