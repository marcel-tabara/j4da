import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Main } from '../../templates/Main'
import { ICategory, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

type IPostProps = {
  _id: string
  title: string
  description: string
  subcategories: [
    {
      title: string
      description: string
    }
  ]
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

export const getStaticProps: GetStaticProps<IPostProps, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/categories/${params._id}`)
  const category: ICategory = await res.json()

  return {
    props: {
      _id: category._id,
      title: category.title,
      description: category.description,
      subcategories: category.subcategories,
    },
  }
}

export default DisplayPost
