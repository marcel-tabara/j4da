import { GetStaticProps } from 'next'
import React from 'react'
import { KeywordForm } from '../../forms/KeywordForm'
import { Main } from '../../templates/Main'
import { IKeyword, IUrl } from '../../types'

const Keyword = (props: IKeyword) => {
  return (
    <Main>
      <KeywordForm props={props} />
    </Main>
  )
}

export const getStaticProps: GetStaticProps<IKeyword, IUrl> = async () => {
  return {
    props: {
      _id: '',
      title: '',
      description: '',
    },
  }
}

export default Keyword
