import React from 'react'
import { KeywordForm } from '../../forms/KeywordForm'
import { Main } from '../../templates/Main'
import { IKeyword } from '../../utils/types'

const Keyword = () => {
  const props = {} as IKeyword
  return (
    <Main>
      <KeywordForm props={props} />
    </Main>
  )
}

export default Keyword
