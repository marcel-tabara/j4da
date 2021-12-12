import { GetStaticProps } from 'next'
import React from 'react'
import { Articles } from '../components/Articles'
import { Main } from '../templates/Main'
import { IArticles, IArticlesProps } from '../types'
import { Config } from '../utils/Config'
import { BASE_URL } from '../utils/constants'

const ArticlesList = (props: IArticlesProps) => (
  <Main>
    <Articles articles={props.articles} pagination={props.pagination} />
  </Main>
)

export const getStaticProps: GetStaticProps<IArticlesProps> = async () => {
  const res = await fetch(`${BASE_URL}/articles`)
  const articles: IArticles = await res.json()
  const posts = articles.data
  const pagination = {}

  return {
    props: {
      articles: posts.slice(0, Config.pagination_size),
      pagination,
    },
  }
}

export default ArticlesList
