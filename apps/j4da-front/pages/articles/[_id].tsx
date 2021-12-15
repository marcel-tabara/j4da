import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import { ArticleForm } from '../../forms/ArticleForm'
import { Main } from '../../templates/Main'
import {
  ArticlesKeywords,
  IApp,
  IArticle,
  IArticles,
  ICategory,
  ISubCategory,
  IUrl,
} from '../../types'
import { BASE_URL } from '../../utils/constants'

const Article = (
  props: IArticle & { categories: ICategory[] } & {
    apps: IApp[]
  } & {
    articlesKeywords: ArticlesKeywords[]
  }
) => {
  const getDefaultCats = () =>
    props.app ? props.categories.filter((cat) => cat.app === props.app) : []
  const [categories, setCategories] = useState<ICategory[]>(getDefaultCats())
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
    setSubcategories(cats?.subcategories ?? [{ title: '', description: '' }])
  }

  const onChaneApp = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = props.categories.filter(
      (category: ICategory) => category.app === event.target.value
    )

    cats.length > 0 && setCategories(cats)
    onChaneCategory({
      target: { value: cats.length > 0 ? cats?.[0]?._id : [] },
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
  IArticle & {
    apps: IApp[]
  } & {
    articlesKeywords: ArticlesKeywords[]
  },
  IUrl
> = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/articles/${params._id}`)
  const article: IArticle = await res.json()

  const resCat = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await resCat.json()

  const resApp = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await resApp.json()

  const resArticlesKeywords = await fetch(
    `${BASE_URL}/articles/articlesKeywords`
  )
  const articlesKeywords: ArticlesKeywords[] = await resArticlesKeywords.json()

  return {
    props: {
      _id: article._id,
      priority: article.priority || 0,
      keyOverride: article.keyOverride || '',
      app: article.app || '',
      url: article.url || '',
      title: article.title || '',
      images: article.images || '',
      section: article.section || '',
      keywords: article.keywords || '',
      dateCreated: article.dateCreated || '',
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
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
      articlesKeywords,
    },
  }
}

export default Article
