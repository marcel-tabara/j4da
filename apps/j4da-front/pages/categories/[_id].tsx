import { useRouter } from 'next/router'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import { CategoryForm } from '../../forms/CategoryForm'
import { useApps } from '../../hooks/useApps'
import { useCategoryById } from '../../hooks/useCategoryById'
import { Main } from '../../templates/Main'

const Category = () => {
  const {
    query: { _id },
  } = useRouter()
  const { categoryById, categoryByIdAvailable } = useCategoryById(_id as string)
  const { appsAvailable, apps } = useApps()

  return (
    <Main>
      {!categoryByIdAvailable || !appsAvailable ? (
        <Spinner animation="grow" />
      ) : (
        <CategoryForm apps={apps} categoryById={categoryById} />
      )}
    </Main>
  )
}

export default Category
