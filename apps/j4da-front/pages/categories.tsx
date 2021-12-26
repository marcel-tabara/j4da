import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Categories } from '../components/Categories'
import { useCategories } from '../hooks/useCategories'
import { Main } from '../templates/Main'

const CategoriesList = () => {
  const { categories, categoriesAvailable } = useCategories()
  const pagination = {}

  return (
    <Main>
      {!categoriesAvailable ? (
        <Spinner animation="grow" />
      ) : (
        <Categories categories={categories} pagination={pagination} />
      )}
    </Main>
  )
}

export default CategoriesList
