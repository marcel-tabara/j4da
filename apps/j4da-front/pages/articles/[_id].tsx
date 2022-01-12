import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { ArticleForm } from '../../forms/ArticleForm'
import { useApps } from '../../hooks/useApps'
import { useArticleById } from '../../hooks/useArticleById'
import { useArticlesKeywords } from '../../hooks/useArticlesKeywords'
import { useCategories } from '../../hooks/useCategories'
import { useKeywords } from '../../hooks/useKeywords'
import { useSelectors } from '../../hooks/useSelectors'
import { useSubcategories } from '../../hooks/useSubcategories'
import { Main } from '../../templates/Main'
import { ICategory, ISubCategory } from '../../utils/types'

const ArticleById = () => {
  const {
    query: { _id },
  } = useRouter()
  useCategories()
  useSubcategories()
  useApps()
  useKeywords()
  useArticleById(_id as string)
  useArticlesKeywords()

  const {
    articlesKeywords,
    allApps,
    allCategories,
    allSubcategories,
    articleById,
  } = useSelectors()

  const getDefaultCats = () =>
    articleById?.app
      ? allCategories.filter((cat) => cat.app._id === articleById.app._id)
      : []

  const [categories, setCategories] = useState<ICategory[]>(getDefaultCats())
  const getSubCat = (cat: string) => {
    return (allSubcategories || []).filter(
      (subcat) => subcat.category._id === cat
    )
  }

  const [subcategories, setSubcategories] = useState<ISubCategory[]>(
    getSubCat(articleById?.category._id)
  )

  const onChangeCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const subcats = (allSubcategories || []).filter(
        (subcategory: ISubCategory) =>
          subcategory.category._id === event.target.value
      )
      setSubcategories(subcats ?? [])
    },
    [allSubcategories]
  )

  const onChangeApp = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const cats = allCategories.filter(
        (category: ICategory) => category.app._id === event.target.value
      )

      setCategories(cats || [])
      onChangeCategory({
        target: { value: '' },
      } as React.ChangeEvent<HTMLSelectElement>)
    },
    [allCategories, onChangeCategory]
  )

  return (
    <Main>
      {!articleById ? (
        <Spinner animation="grow" />
      ) : (
        <ArticleForm
          onChangeCategory={onChangeCategory}
          onChangeApp={onChangeApp}
          categories={categories}
          subcategories={subcategories}
          article={articleById}
          allApps={allApps}
          articlesKeywords={articlesKeywords}
        />
      )}
    </Main>
  )
}

export default ArticleById
