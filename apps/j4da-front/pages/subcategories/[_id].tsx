import { useSelectors } from 'apps/j4da-front/hooks/useSelectors'
import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap'
import { SubcategoryForm } from '../../forms/SubcategoryForm'
import { useSubcategoryById } from '../../hooks/useSubcategoryById'
import { Main } from '../../templates/Main'

const Subcategory = () => {
  const {
    query: { _id },
  } = useRouter()
  const { subcategoryById, subcategoryByIdAvailable, subcategoryByIdFetching } =
    useSubcategoryById(_id as string)
  const { categoriesAvailable, categories, categoriesFetching } = useSelectors()

  return (
    <Main>
      {!subcategoryByIdAvailable ||
      subcategoryByIdFetching ||
      !categoriesAvailable ||
      categoriesFetching ? (
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
