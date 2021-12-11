import { ReactNode } from 'react'

export interface IKeyword {
  _id: string
  title: string
  description: string
}

export interface ICategory {
  _id: string
  title: string
  description: string
  subcategories: [
    {
      title: string
      description: string
    }
  ]
}

export interface IArticle {
  _id: string
  title: string
  description: string
  body: string
  author: string
  date: string
  slug: string
  image: string
}

export interface IArticles {
  total: number
  skip: number
  limit: number
  data: [
    {
      _id: string
      title: string
      description: string
      body: string
      author: string
      date: string
      slug: string
      image: string
    }
  ]
}

export interface ICategory {
  title: string
  description: string
  subcategories: [
    {
      title: string
      description: string
    }
  ]
}

export type IArticlesProps = {
  posts: PostItems[]
  pagination: never
}

export type ICategoriesProps = {
  categories: ICategory[]
  pagination: never
}

export type IKeywordsProps = {
  keywords: IKeyword[]
  pagination: never
}

export type PostItems = {
  [key: string]: string
}

export type IMainProps = {
  children: ReactNode
}

export type IUrl = {
  _id: string
}
