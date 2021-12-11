import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Articles } from '../components/Articles'
import { Main } from '../templates/Main'
import { IArticles, IArticlesProps, IUrl } from '../types'
import { BASE_URL } from '../utils/constants'

type IPageUrl = {
  page: string
}
const PaginatePosts = (props: IArticlesProps) => (
  <Main>
    <Articles posts={props.posts} pagination={props.pagination} />
  </Main>
)

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/articles`)
  const articles: IArticles = await res.json()
  const posts = articles.data
  const pages = posts

  return {
    paths: pages.slice(1).map((_, ind) => ({
      params: {
        page: `page${ind + 2}`,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IArticlesProps, IPageUrl> = async ({
  params,
}) => {
  const res = await fetch(BASE_URL)
  const articles: IArticles = await res.json()
  const posts = articles.data

  const pages = posts
  const currentPage = Number(params.page.replace('page', ''))
  const currentInd = currentPage - 1
  const pagination = {}

  return {
    props: {
      posts: pages[currentInd],
      pagination,
    },
  }
}

export default PaginatePosts
