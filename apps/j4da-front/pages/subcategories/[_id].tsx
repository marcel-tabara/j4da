import { useRouter } from 'next/router'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import { SubcategoryForm } from '../../forms/SubcategoryForm'
import { useCategories } from '../../hooks/useCategories'
import { useSubcategoryById } from '../../hooks/useSubcategoryById'
import { Main } from '../../templates/Main'

const Subcategory = () => {
  const {
    query: { _id },
  } = useRouter()
  const { subcategoryById, subcategoryByIdAvailable } = useSubcategoryById(
    _id as string
  )
  const { categoriesAvailable, categories } = useCategories()

  return (
    <Main>
      {!subcategoryByIdAvailable || !categoriesAvailable ? (
        <Spinner animation="grow" />
      ) : (
        <SubcategoryForm
          categories={categories}
          subcategoryById={subcategoryById}
        />
      )}
    </Main>
  )
}

export default Subcategory
