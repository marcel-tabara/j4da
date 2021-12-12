import { GetStaticProps } from 'next'
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

export const getStaticProps: GetStaticProps<
  ICategory & { apps: IApp[] },
  IUrl
> = async ({ params }) => {
  const resApp = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await resApp.json()

  return {
    props: {
      _id: '',
      title: '',
      description: '',
      subcategories: undefined,
      app: '',
      apps,
    },
  }
}

export default Category
