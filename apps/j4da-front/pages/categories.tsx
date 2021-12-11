import { GetStaticProps } from 'next'
import React from 'react'
import { Categories } from '../components/Categories'
import { Main } from '../templates/Main'
import { ICategoriesProps, ICategory } from '../types'
import { Config } from '../utils/Config'
import { BASE_URL } from '../utils/constants'

const Index = (props: ICategoriesProps) => (
  <Main>
    <Categories categories={props.categories} pagination={props.pagination} />
  </Main>
)

export const getStaticProps: GetStaticProps<ICategoriesProps> = async () => {
  const res = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await res.json()
  const pagination = {}

  return {
    props: {
      categories: categories.slice(0, Config.pagination_size),
      pagination,
    },
  }
}

export default Index
