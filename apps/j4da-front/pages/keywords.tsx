import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Keywords } from '../components/Keywords'
import { useKeywords } from '../hooks/useKeywords'
import { Main } from '../templates/Main'

const KeywordsList = () => {
  const { keywords, keywordsAvailable } = useKeywords()
  const pagination = {}

  return (
    <Main>
      {!keywordsAvailable ? (
        <Spinner animation="grow" />
      ) : (
        <Keywords keywords={keywords} pagination={pagination} />
      )}
    </Main>
  )
}

export default KeywordsList
