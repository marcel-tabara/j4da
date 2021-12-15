import { ReactNode } from 'react'

export interface ArticlesKeywords {
  keyword: string
  url: string
  slug: string
  category: string
  subcategory: string
  priority: number
}

export interface IApp {
  _id: string
  keyOverride?: string
  url?: string
  title?: string
  images?: string | string[]
  section?: string
  keywords?: string
  dateCreated?: string
  datePublished?: string
  dateModified?: string
  authorName?: string | string[]
  description?: string
  body?: string
  publisherName?: string
  publisherLogo?: string
}

export interface IKeyword {
  _id: string
  title?: string
  description?: string
  count?: number
}

export interface IArticle {
  _id: string
  keyOverride?: string
  url?: string
  title: string
  images?: string | string[]
  section?: string
  keywords?: string
  dateCreated?: string
  datePublished?: string
  dateModified?: string
  authorName?: string | string[]
  description?: string
  body?: string
  publisherName?: string
  publisherLogo?: string
  slug?: string
  category?: string
  subcategory?: string
  app: string
  priority: number
}

export interface IArticles {
  total: number
  skip: number
  limit: number
  data: IArticle[]
}

export interface ISubCategory {
  title: string
  description: string
}

export interface ICategory {
  _id: string
  title: string
  description?: string
  app: string
  subcategories?: ISubCategory[]
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

export interface IAppsProps {
  apps: IApp[]
  pagination: Record<string, unknown>
}

export interface IMainProps {
  children: ReactNode
}

export type IUrl = {
  _id: string
}
