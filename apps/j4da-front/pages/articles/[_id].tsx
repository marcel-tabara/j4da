import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import { ArticleForm } from '../../forms/ArticleForm'
import { Main } from '../../templates/Main'
import {
  IApp,
  IArticle,
  IArticles,
  ICategory,
  ISubCategories,
  IUrl,
} from '../../types'
import { BASE_URL } from '../../utils/constants'

const Article = (
  props: IArticle & { categories: ICategory[] } & {
    apps: IApp[]
  }
) => {
  const getSubCat = (cat: string) => {
    const category = props.categories.find(
      (category: ICategory) => category._id === cat
    )
    return category?.subcategories
  }

  const [subcategories, setSubcategories] = useState<ISubCategories>(
    getSubCat(props.category)
  )

  const onChaneCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = props.categories.find(
      (category: ICategory) => category._id === event.target.value
    )
    setSubcategories(cats.subcategories)
  }

  return (
    <Main>
      <ArticleForm
        props={props}
        subcategories={subcategories}
        onChaneCategory={onChaneCategory}
      />
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/articles`)
  const articles: IArticles = await res.json()
  const posts = articles.data

  return {
    paths: posts.map((post) => ({
      params: {
        _id: post._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  IArticle & { categories: ICategory[] } & {
    apps: IApp[]
  },
  IUrl
> = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/articles/${params._id}`)
  const article: IArticle = await res.json()

  const resCat = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await resCat.json()

  const resApp = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await resApp.json()

  return {
    props: {
      _id: article._id,
      keyOverride: article.keyOverride || '',
      app: article.app || '',
      url: article.url || '',
      title: article.title || '',
      images: article.images || '',
      section: article.section || '',
      keywords: article.keywords || '',
      dateCreated: article.dateCreated || '',
      datePublished: article.datePublished || '',
      dateModified: article.dateModified || '',
      authorName: article.authorName || '',
      description: article.description || '',
      body: article.body || '',
      publisherName: article.publisherName || '',
      publisherLogo: article.publisherLogo || '',
      slug: article.slug || '',
      category: article.category || '',
      subcategory: article.subcategory || '',
      categories,
      apps,
    },
  }
}

export default Article
