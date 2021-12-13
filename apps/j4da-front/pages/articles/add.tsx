import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { ArticleForm } from '../../forms/ArticleForm'
import { Main } from '../../templates/Main'
import { IApp, IArticle, ICategory, ISubCategory, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

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

export const getStaticProps: GetStaticProps<
  IArticle & {
    apps: IApp[]
  },
  IUrl
> = async () => {
  const resCat = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await resCat.json()

  const resApp = await fetch(`${BASE_URL}/apps`)
  const apps: IApp[] = await resApp.json()

  return {
    props: {
      _id: '',
      keyOverride: '',
      app: '',
      url: '',
      title: '',
      images: '',
      section: '',
      keywords: '',
      dateCreated: '',
      datePublished: '',
      dateModified: '',
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
    },
  }
}

export default Article
