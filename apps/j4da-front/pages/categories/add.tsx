import React from 'react'
import { Spinner } from 'react-bootstrap'
import { CategoryForm } from '../../forms/CategoryForm'
import { useApps } from '../../hooks/useApps'
import { Main } from '../../templates/Main'
import { ICategory } from '../../utils/types'

const Category = () => {
  const categoryById = {} as ICategory
  const { appsAvailable, apps } = useApps()

  return (
    <Main>
      {!appsAvailable ? (
        <Spinner animation="grow" />
      ) : (
        <CategoryForm apps={apps} categoryById={categoryById} />
      )}
    </Main>
  )
}

export default Category
