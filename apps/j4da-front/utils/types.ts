import { Action } from '@reduxjs/toolkit'
import { ReactNode } from 'react'

export interface IArticlesKeyword {
  keyword: string
  url: string
  slug: string
  category: string
  subcategory: string
  priority: number
  _id: string
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
  authorName?: string
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
  keywords?: string
  dateCreated?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  description?: string
  body?: string
  publisherName?: string
  publisherLogo?: string
  slug?: string
  category?: { _id: string; title: string }
  subcategory?: string
  app: { _id: string; title: string }
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
  app: { _id: string; title: string }
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

export interface TaskAction<T> extends Action, ITask<T> {
  type: string
}

interface ITask<T> {
  id: number
  payload: T
}
