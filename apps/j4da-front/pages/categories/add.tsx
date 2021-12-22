import { GetStaticProps } from 'next'
import React from 'react'
import { CategoryForm } from '../../forms/CategoryForm'
import { Main } from '../../templates/Main'
import { BASE_URL } from '../../utils/constants'
import { IApp, ICategory, IUrl } from '../../utils/types'

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
      subcategories: [{ title: '', description: '' }],
      app: '',
      apps,
    },
  }
}

export default Category
