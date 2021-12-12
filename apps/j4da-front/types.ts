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
  keyOverride: string
  url: string
  title: string
  images: string | string[]
  section: string
  keywords: string
  dateCreated: string
  datePublished: string
  dateModified: string
  authorName: string | string[]
  description: string
  body: string
  publisherName: string
  publisherLogo: string
  slug: string
  category: string
  subcategory: string
}

export interface IArticles {
  total: number
  skip: number
  limit: number
  data: IArticle[]
}

export interface ICategoryBase {
  title: string
  description: string
}
export type ISubCategory = [{ title: string; description: string }]
export type ISubCategories = { title: string; description: string }

export interface ICategory extends ICategoryBase {
  subcategories: ISubCategory
}

export interface IArticlesProps {
  articles: IArticle[]
  pagination: Record<string, unknown>
}

export interface ICategoriesProps {
  categories: ICategory[]
  pagination: Record<string, unknown>
}

export interface IKeywordsProps {
  keywords: IKeyword[]
  pagination: Record<string, unknown>
}

export interface PostItems {
  [key: string]: string
}

export interface IMainProps {
  children: ReactNode
}

export type IUrl = {
  _id: string
}
