import { useSelectors } from 'apps/j4da-front/hooks/useSelectors'
import { Spinner } from 'react-bootstrap'
import { CategoryForm } from '../../forms/CategoryForm'
import { Main } from '../../templates/Main'
import { ICategory } from '../../utils/types'

const Category = () => {
  const categoryById = {} as ICategory
  const {
    appsAvailable,
    apps,
    appsFetching,
    categoryByIdAvailable,
    categoryByIdFetching,
  } = useSelectors()

  return (
    <Main>
      {!appsAvailable ||
      appsFetching ||
      !categoryByIdAvailable ||
      categoryByIdFetching ? (
        <Spinner animation="grow" />
      ) : (
        <CategoryForm apps={apps} categoryById={categoryById} />
      )}
    </Main>
  )
}

export default Category
