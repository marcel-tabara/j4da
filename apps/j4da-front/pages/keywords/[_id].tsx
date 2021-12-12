import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { KeywordForm } from '../../forms/KeywordForm'
import { Main } from '../../templates/Main'
import { IKeyword, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const Keyword = (props: IKeyword) => {
  return (
    <Main>
      <KeywordForm props={props} />
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/keywords`)
  const keywords: IKeyword[] = await res.json()

  return {
    paths: keywords.map((keyword) => ({
      params: {
        _id: keyword._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IKeyword, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/keywords/${params._id}`)
  const keyword: IKeyword = await res.json()

  return {
    props: {
      _id: keyword._id,
      title: keyword.title,
      description: keyword.description,
    },
  }
}

export default Keyword
