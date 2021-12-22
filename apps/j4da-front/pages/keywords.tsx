import React from 'react'
import { Keywords } from '../components/Keywords'
import { useKeywords } from '../hooks/useKeywords'
import { Main } from '../templates/Main'

const KeywordsList = () => {
  const { keywords } = useKeywords()
  const pagination = {}

  return (
    <Main>
      <Keywords keywords={keywords} pagination={pagination} />
    </Main>
  )
}

export default KeywordsList
