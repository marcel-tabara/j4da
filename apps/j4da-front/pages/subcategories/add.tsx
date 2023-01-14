import { useSelectors } from 'apps/j4da-front/hooks/useSelectors'
import { Spinner } from 'react-bootstrap'
import { SubcategoryForm } from '../../forms/SubcategoryForm'
import { Main } from '../../templates/Main'
import { ISubCategory } from '../../utils/types'

const Subcategory = () => {
  const subcategoryById = {} as ISubCategory
  const { categoriesAvailable, categories, categoriesFetching } = useSelectors()

  return (
    <Main>
      {!categoriesAvailable || categoriesFetching ? (
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
