import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ArticleForm } from '../../forms/ArticleForm'
import { useApps } from '../../hooks/useApps'
import { useCategories } from '../../hooks/useCategories'
import { useKeywords } from '../../hooks/useKeywords'
import { useSelectors } from '../../hooks/useSelectors'
import { articleByIdService } from '../../services'
import { Main } from '../../templates/Main'
import { ICategory, ISubCategory } from '../../utils/types'

const Article = () => {
  const dispatch = useDispatch()
  const {
    query: { _id },
  } = useRouter()
  useCategories()
  useApps()
  useKeywords()

  useEffect(() => {
    _id && dispatch(articleByIdService.actions.getArticleById(_id as string))
  }, [dispatch, _id])

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

  const onChaneCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = allCategories.find(
      (category: ICategory) => category._id === event.target.value
    )
    setSubcategories(cats?.subcategories ?? [])
  }

  const onChaneApp = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cats = allCategories.filter(
      (category: ICategory) => category.app === event.target.value
    )

    setCategories(cats || [])
    onChaneCategory({
      target: { value: '' },
    } as React.ChangeEvent<HTMLSelectElement>)
  }

  return (
    <Main>
      {!articleById ? (
        <Spinner animation="grow" />
      ) : (
        <ArticleForm
          subcategories={subcategories}
          onChaneCategory={onChaneCategory}
          onChaneApp={onChaneApp}
          categories={categories}
          article={articleById}
          allApps={allApps}
        />
      )}
    </Main>
  )
}

// export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
//   const res = await fetch(`${BASE_URL}/articles`)
//   const articles: IArticles = await res.json()
//   const posts = articles.data

//   return {
//     paths: posts.map((post) => ({
//       params: {
//         _id: post._id,
//       },
//     })),
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps<
//   IArticle & {
//     apps: IApp[]
//   } & {
//     articleKeywords: IArticlesKeywords[]
//   },
//   IUrl
// > = async ({ params }) => {
//   const res = await fetch(`${BASE_URL}/articles/${params._id}`)
//   const article: IArticle = await res.json()

//   const resCat = await fetch(`${BASE_URL}/categories`)
//   const categories: ICategory[] = await resCat.json()

//   const resApp = await fetch(`${BASE_URL}/apps`)
//   const apps: IApp[] = await resApp.json()

//   const resArticlesKeywords = await fetch(
//     `${BASE_URL}/articles/articleKeywords`
//   )
//   const articleKeywords: IArticlesKeywords[] = await resArticlesKeywords.json()

//   return {
//     props: {
//       _id: article._id,
//       priority: article.priority || 0,
//       keyOverride: article.keyOverride || '',
//       app: article.app || '',
//       url: article.url || '',
//       title: article.title || '',
//       images: article.images || '',
//       section: article.section || '',
//       keywords: article.keywords || '',
//       dateCreated: article.dateCreated || '',
//       datePublished: new Date().toISOString(),
//       dateModified: new Date().toISOString(),
//       authorName: article.authorName || '',
//       description: article.description || '',
//       body: article.body || '',
//       publisherName: article.publisherName || '',
//       publisherLogo: article.publisherLogo || '',
//       slug: article.slug || '',
//       category: article.category || '',
//       subcategory: article.subcategory || '',
//       categories,
//       apps,
//       articleKeywords,
//     },
//   }
// }

export default Article
