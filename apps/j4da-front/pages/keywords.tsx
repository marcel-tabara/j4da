import { GetStaticProps } from 'next'
import React from 'react'
import { Keywords } from '../components/Keywords'
import { Main } from '../templates/Main'
import { IKeyword, IKeywordsProps } from '../types'
import { Config } from '../utils/Config'
import { BASE_URL } from '../utils/constants'

const KeywordsList = (props: IKeywordsProps) => (
  <Main>
    <Keywords keywords={props.keywords} pagination={props.pagination} />
  </Main>
)

export const getStaticProps: GetStaticProps<IKeywordsProps> = async () => {
  const res = await fetch(`${BASE_URL}/keywords`)
  const keywords: IKeyword[] = await res.json()
  const pagination = {}

  return {
    props: {
      keywords: keywords.slice(0, Config.pagination_size),
      pagination,
    },
  }
}

export default KeywordsList
