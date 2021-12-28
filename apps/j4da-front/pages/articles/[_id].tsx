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
import { Main } from '../../templates/Main'
import { ICategory, ISubCategory } from '../../utils/types'

const ArticleById = () => {
  const {
    query: { _id },
  } = useRouter()
  useCategories()
  useApps()
  useKeywords()
  useArticleById(_id as string)
  useArticlesKeywords()

  const { articlesKeywords, allApps, allCategories, articleById } =
    useSelectors()

  const getDefaultCats = () =>
    articleById?.app
      ? allCategories.filter((cat) => cat.app._id === articleById.app._id)
      : []

  const [categories, setCategories] = useState<ICategory[]>(getDefaultCats())
  const getSubCat = (cat: string) => {
    const category = categories.find(
      (category: ICategory) => category._id === cat
    )
    return category?.subcategories
  }

  const [subcategories, setSubcategories] = useState<ISubCategory[]>(
    getSubCat(articleById?.category._id)
  )

  const onChangeCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const cats = allCategories.find(
        (category: ICategory) => category._id === event.target.value
      )
      setSubcategories(cats?.subcategories ?? [])
    },
    [allCategories]
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
