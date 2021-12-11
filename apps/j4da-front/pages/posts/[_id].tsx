import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Main } from '../../templates/Main'
import { IArticle, IArticles, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

type IPostProps = {
  _id: string
  title: string
  description: string
  date: string
  image: string
  body: string
}

const DisplayPost = (props: IPostProps) => (
  <Main>
    <h1 className="text-center font-bold text-3xl text-gray-900">
      {props.title}
    </h1>
    <div className="text-center text-sm mb-8">{new Date(props.date)}</div>

    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.body }}
    />
  </Main>
)

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/articles`)
  const articles: IArticles = await res.json()
  const posts = articles.data

  return {
    paths: posts.map((post) => ({
      params: {
        _id: post._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IPostProps, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/articles/${params._id}`)
  const post: IArticle = await res.json()

  return {
    props: {
      _id: post._id,
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      body: post.body,
    },
  }
}

export default DisplayPost
