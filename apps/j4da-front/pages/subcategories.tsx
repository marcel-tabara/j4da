import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Subcategories } from '../components/Subcategories'
import { useSubcategories } from '../hooks/useSubcategories'
import { Main } from '../templates/Main'

const SubcategoriesList = () => {
  const { subcategories, subcategoriesAvailable } = useSubcategories()
  const pagination = {}

  return (
    <Main>
      {!subcategoriesAvailable ? (
        <Spinner animation="grow" />
      ) : (
        <Subcategories subcategories={subcategories} pagination={pagination} />
      )}
    </Main>
  )
}

export default SubcategoriesList
