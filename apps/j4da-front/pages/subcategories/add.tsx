import React from 'react'
import { Spinner } from 'react-bootstrap'
import { SubcategoryForm } from '../../forms/SubcategoryForm'
import { useCategories } from '../../hooks/useCategories'
import { Main } from '../../templates/Main'
import { ISubCategory } from '../../utils/types'

const Subcategory = () => {
  const subcategoryById = {} as ISubCategory
  const { categoriesAvailable, categories } = useCategories()

  return (
    <Main>
      {!categoriesAvailable ? (
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
