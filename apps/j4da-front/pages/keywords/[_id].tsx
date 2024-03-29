import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap'
import { KeywordForm } from '../../forms/KeywordForm'
import { useKeywordById } from '../../hooks/useKeywordById'
import { Main } from '../../templates/Main'

const Keyword = () => {
  const {
    query: { _id },
  } = useRouter()
  const { keywordById, keywordByIdAvailable, keywordByIdFetching } =
    useKeywordById(_id as string)
  return (
    <Main>
      {!keywordByIdAvailable || keywordByIdFetching ? (
        <Spinner animation="grow" />
      ) : (
        <KeywordForm keywordById={keywordById} />
      )}
    </Main>
  )
}

export default Keyword
