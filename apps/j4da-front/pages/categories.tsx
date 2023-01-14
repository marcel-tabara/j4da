import { Spinner } from 'react-bootstrap'
import { Categories } from '../components/Categories'
import { useSelectors } from '../hooks/useSelectors'
import { Main } from '../templates/Main'

const CategoriesList = () => {
  const { categories, categoriesAvailable, categoriesFetching } = useSelectors()
  const pagination = {}

  return (
    <Main>
      {!categoriesAvailable || categoriesFetching ? (
        <Spinner animation="grow" />
      ) : (
        <Categories categories={categories} pagination={pagination} />
      )}
    </Main>
  )
}

export default CategoriesList
