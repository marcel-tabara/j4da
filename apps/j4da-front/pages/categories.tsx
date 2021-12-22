import React from 'react'
import { Categories } from '../components/Categories'
import { useCategories } from '../hooks/useCategories'
import { Main } from '../templates/Main'

const CategoriesList = () => {
  const { categories, status } = useCategories()
  const pagination = {}

  return (
    <Main>
      <Categories categories={categories} pagination={pagination} />
    </Main>
  )
}

export default CategoriesList
