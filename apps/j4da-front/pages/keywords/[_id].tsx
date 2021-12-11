import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Main } from '../../templates/Main'
import { IKeyword, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

type IPostProps = {
  _id: string
  title: string
  description: string
}

const DisplayPost = (props: IPostProps) => (
  <Main>
    <h1 className="text-center font-bold text-3xl text-gray-900">
      {props.title}
    </h1>
    <div className="text-center text-sm mb-8">{props.description}</div>
  </Main>
)

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

export const getStaticProps: GetStaticProps<IPostProps, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/keywords/${params._id}`)
  const keyword: IKeyword = await res.json()

  // const content = await markdownToHtml(post.body || '')

  return {
    props: {
      _id: keyword._id,
      title: keyword.title,
      description: keyword.description,
    },
  }
}

export default DisplayPost
