import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ArticleForm } from '../../forms/ArticleForm'
import { useApps } from '../../hooks/useApps'
import { useCategories } from '../../hooks/useCategories'
import { useKeywords } from '../../hooks/useKeywords'
import { useSelectors } from '../../hooks/useSelectors'
import { Main } from '../../templates/Main'
import { ICategory, ISubCategory } from '../../utils/types'

const ArticleAdd = () => {
  const dispatch = useDispatch()
  const {
    query: { _id },
  } = useRouter()
  useCategories()
  useApps()
  useKeywords()

  const { allApps, allCategories, articleById } = useSelectors()
  const getDefaultCats = () =>
    articleById?.app
      ? allCategories.filter((cat) => cat.app === articleById.app)
      : []
  const [categories, setCategories] = useState<ICategory[]>(getDefaultCats())
  const getSubCat = (cat: string) => {
    const category = categories.find(
      (category: ICategory) => category._id === cat
    )
    return category?.subcategories
  }

  const [subcategories, setSubcategories] = useState<ISubCategory[]>(
    getSubCat(articleById?.category)
  )

  const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = allCategories.find(
      (category: ICategory) => category._id === event.target.value
    )
    setSubcategories(cats?.subcategories ?? [])
  }

  const onChangeApp = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = allCategories.filter(
      (category: ICategory) => category.app === event.target.value
    )
    setCategories(cats || [])
    onChangeCategory({
      target: { value: '' },
    } as React.ChangeEvent<HTMLSelectElement>)
  }

  return (
    <Main>
      <ArticleForm
        subcategories={subcategories}
        onChangeCategory={onChangeCategory}
        onChangeApp={onChangeApp}
        categories={categories}
        article={articleById}
        allApps={allApps}
      />
    </Main>
  )
}

export default ArticleAdd
