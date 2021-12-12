import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { CategoryForm } from '../../forms/CategoryForm'
import { Main } from '../../templates/Main'
import { IApp, ICategory, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const Category = (props: ICategory & { apps: IApp[] }) => {
  return (
    <Main>
      <CategoryForm props={props} />
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await res.json()

  return {
    paths: categories.map((category) => ({
      params: {
        _id: category._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  ICategory & { apps: IApp[] },
  IUrl
> = async ({ params }) => {
  const resCat = await fetch(`${BASE_URL}/categories/${params._id}`)
  const category: ICategory = await resCat.json()

  const resApp = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await resApp.json()

  return {
    props: {
      _id: category._id || '',
      title: category.title || '',
      description: category.description || '',
      subcategories: category.subcategories,
      app: category.app || '',
      apps,
    },
  }
}

export default Category
