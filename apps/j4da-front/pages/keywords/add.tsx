import React from 'react'
import { KeywordForm } from '../../forms/KeywordForm'
import { Main } from '../../templates/Main'
import { IKeyword } from '../../utils/types'

const Keyword = () => {
  const keywordById = {} as IKeyword
  return (
    <Main>
      <KeywordForm keywordById={keywordById} />
    </Main>
  )
}

export default Keyword
