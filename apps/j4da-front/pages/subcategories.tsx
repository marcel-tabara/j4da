import { Spinner } from 'react-bootstrap'
import { Subcategories } from '../components/Subcategories'
import { useSelectors } from '../hooks/useSelectors'
import { Main } from '../templates/Main'

const SubcategoriesList = () => {
  const { subcategories, subcategoriesAvailable, subcategoriesFetching } =
    useSelectors()
  const pagination = {}

  return (
    <Main>
      {!subcategoriesAvailable || subcategoriesFetching ? (
        <Spinner animation="grow" />
      ) : (
        <Subcategories subcategories={subcategories} pagination={pagination} />
      )}
    </Main>
  )
}

export default SubcategoriesList
