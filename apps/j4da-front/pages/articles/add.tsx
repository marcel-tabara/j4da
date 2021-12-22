import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { ArticleForm } from '../../forms/ArticleForm'
import { Main } from '../../templates/Main'
import { BASE_URL } from '../../utils/constants'
import {
  IApp,
  IArticle,
  IArticlesKeywords,
  ICategory,
  ISubCategory,
  IUrl,
} from '../../utils/types'

const Article = (
  props: IArticle & { categories: ICategory[] } & {
    apps: IApp[]
  }
) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const getSubCat = (cat: string) => {
    const category = categories.find(
      (category: ICategory) => category._id === cat
    )
    return category?.subcategories
  }

  const [subcategories, setSubcategories] = useState<ISubCategory[]>(
    getSubCat(props.category)
  )

  const onChaneCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = props.categories.find(
      (category: ICategory) => category._id === event.target.value
    )
    setSubcategories(cats?.subcategories ?? [])
  }

  const onChaneApp = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = props.categories.filter(
      (category: ICategory) => category.app === event.target.value
    )

    setCategories(cats || [])
    onChaneCategory({
      target: { value: '' },
    } as React.ChangeEvent<HTMLSelectElement>)
  }

  return (
    <Main>
      <ArticleForm
        props={props}
        subcategories={subcategories}
        onChaneCategory={onChaneCategory}
        onChaneApp={onChaneApp}
        categories={categories}
      />
    </Main>
  )
}

export const getStaticProps: GetStaticProps<
  IArticle & {
    apps: IApp[]
  } & {
    articleKeywords: IArticlesKeywords[]
  },
  IUrl
> = async () => {
  const resCat = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await resCat.json()

  const resApp = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await resApp.json()

  const resArticlesKeywords = await fetch(
    `${BASE_URL}/articles/articleKeywords`
  )
  const articleKeywords: IArticlesKeywords[] = await resArticlesKeywords.json()

  return {
    props: {
      _id: '',
      priority: 0,
      keyOverride: '',
      app: '',
      url: '',
      title: '',
      images: '',
      section: '',
      keywords: '',
      dateCreated: new Date().toISOString(),
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      authorName: '',
      description: '',
      body: '',
      publisherName: '',
      publisherLogo: '',
      slug: '',
      category: '',
      subcategory: '',
      categories,
      apps,
      articleKeywords,
    },
  }
}

export default Article
