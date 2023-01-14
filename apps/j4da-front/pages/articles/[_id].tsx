import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { ArticleForm } from '../../forms/ArticleForm'
import { useArticleById } from '../../hooks/useArticleById'
import { useSelectors } from '../../hooks/useSelectors'
import { Main } from '../../templates/Main'
import { ICategory, ISubCategory } from '../../utils/types'

const ArticleById = () => {
  const {
    query: { _id },
  } = useRouter()
  useArticleById(_id as string)

  const {
    apps,
    categories,
    subcategories,
    articleById,
    articleByIdAvailable,
    articleByIdFetching,
  } = useSelectors()

  const getDefaultCats = () =>
    articleById?.app
      ? categories.filter((cat) => cat.app._id === articleById.app._id)
      : []

  const [cats, setCats] = useState<ICategory[]>(getDefaultCats())
  const getSubCat = (cat: string) => {
    return (subcategories || []).filter((subcat) => subcat.category._id === cat)
  }

  const [subcats, setSubcats] = useState<ISubCategory[]>(
    getSubCat(articleById?.category._id)
  )

  const onChangeCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const filteredSubcats = (subcategories || []).filter(
        (subcategory: ISubCategory) =>
          subcategory.category._id === event.target.value
      )
      setSubcats(filteredSubcats ?? [])
    },
    [subcategories]
  )

  const onChangeApp = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const filteredCats = categories.filter(
        (category: ICategory) => category.app._id === event.target.value
      )

      setCats(filteredCats || [])
      onChangeCategory({
        target: { value: '' },
      } as ChangeEvent<HTMLSelectElement>)
    },
    [categories, onChangeCategory]
  )

  return (
    <Main>
      {!articleByIdAvailable || articleByIdFetching ? (
        <Spinner animation="grow" />
      ) : (
        <ArticleForm
          onChangeCategory={onChangeCategory}
          onChangeApp={onChangeApp}
          categories={cats}
          subcategories={subcats}
          article={articleById}
          allApps={apps}
        />
      )}
    </Main>
  )
}

export default ArticleById
