import React, { useCallback, useState } from 'react'
import { ArticleForm } from '../../forms/ArticleForm'
import { useApps } from '../../hooks/useApps'
import { useArticlesKeywords } from '../../hooks/useArticlesKeywords'
import { useCategories } from '../../hooks/useCategories'
import { useKeywords } from '../../hooks/useKeywords'
import { useSelectors } from '../../hooks/useSelectors'
import { useSubcategories } from '../../hooks/useSubcategories'
import { Main } from '../../templates/Main'
import { IArticle, ICategory, ISubCategory } from '../../utils/types'

const ArticleAdd = () => {
  useCategories()
  useSubcategories()
  useApps()
  useKeywords()
  useArticlesKeywords()

  const { articlesKeywords, allApps, allCategories, allSubcategories } =
    useSelectors()

  const getDefaultCats = () => []

  const [categories, setCategories] = useState<ICategory[]>(getDefaultCats())
  const [subcategories, setSubcategories] = useState<ISubCategory[]>([])

  const onChangeCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const subcats = allSubcategories.filter(
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
  const article = { dateCreated: new Date().toISOString() } as IArticle
  return (
    <Main>
      <ArticleForm
        onChangeCategory={onChangeCategory}
        onChangeApp={onChangeApp}
        categories={categories}
        subcategories={subcategories}
        article={article}
        allApps={allApps}
        articlesKeywords={articlesKeywords}
      />
    </Main>
  )
}

export default ArticleAdd
