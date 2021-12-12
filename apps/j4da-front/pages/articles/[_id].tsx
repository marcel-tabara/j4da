import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Main } from '../../templates/Main'
import { IArticle, IArticles, ICategory, ISubCategory, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const Article = (props: IArticle & { categories: ICategory[] }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticle>()
  const getSubCat = (cat: string) => {
    const category = props.categories.find(
      (category: ICategory) => category._id === cat
    )
    return category?.subcategories
  }
  const onSubmit = handleSubmit((data) => console.log(data))
  const [subcategories, setSubcategories] = useState<ISubCategory>(
    getSubCat(props.category)
  )

  const onChaneCategory = (e) => {
    const cats = props.categories.find(
      (category: ICategory) => category._id === e.target.value
    )
    setSubcategories(cats.subcategories)
  }

  return (
    <Main>
      <div className="register-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>keyOverride</label>
            <input
              {...register('keyOverride')}
              defaultValue={props.keyOverride}
              className={`form-control ${
                errors.keyOverride ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>url</label>
            <input
              {...register('url')}
              defaultValue={props.url}
              className={`form-control ${errors.url ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>title</label>
            <input
              {...register('title')}
              defaultValue={props.title}
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>category</label>
            <select
              {...register('category')}
              defaultValue={props.category}
              name="category"
              onChange={onChaneCategory}
              className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            >
              <option key="category.select" value="">
                Select Category
              </option>
              {props.categories.map((category: ICategory) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>subcategory</label>
            <select
              {...register('subcategory')}
              defaultValue={subcategories?.[0]?.title || ''}
              name="subcategory"
              className={`form-control ${
                errors.subcategory ? 'is-invalid' : ''
              }`}
            >
              <option key="subcategory.select" value="">
                Select SubCategory
              </option>
              {(subcategories || []).map(
                (subcategory: { title: string; description: string }) => (
                  <option key={subcategory.title} value={subcategory.title}>
                    {subcategory.title}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="form-group">
            <label>images</label>
            <input
              {...register('images')}
              defaultValue={props.images}
              className={`form-control ${errors.images ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>section</label>
            <input
              {...register('section')}
              defaultValue={props.section}
              className={`form-control ${errors.section ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>keywords</label>
            <input
              {...register('keywords')}
              defaultValue={props.keywords}
              className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>dateCreated</label>
            <input
              {...register('dateCreated')}
              defaultValue={props.dateCreated}
              className={`form-control ${
                errors.dateCreated ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>datePublished</label>
            <input
              {...register('datePublished')}
              defaultValue={props.datePublished}
              className={`form-control ${
                errors.datePublished ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>dateModified</label>
            <input
              {...register('dateModified')}
              defaultValue={new Date().toISOString()}
              className={`form-control ${
                errors.dateModified ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>authorName</label>
            <input
              {...register('authorName')}
              defaultValue={props.authorName}
              className={`form-control ${
                errors.authorName ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>description</label>
            <textarea
              {...register('description')}
              defaultValue={props.description}
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>body</label>
            <textarea
              {...register('body')}
              defaultValue={props.body}
              className={`form-control ${errors.body ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>publisherName</label>
            <input
              {...register('publisherName')}
              defaultValue={props.publisherName}
              className={`form-control ${
                errors.publisherName ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>publisherLogo</label>
            <input
              {...register('publisherLogo')}
              defaultValue={props.publisherLogo}
              className={`form-control ${
                errors.publisherLogo ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <label>slug</label>
            <input
              {...register('slug')}
              defaultValue={props.slug}
              className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
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
  IArticle & { categories: ICategory[] },
  IUrl
> = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/articles/${params._id}`)
  const article: IArticle = await res.json()

  const resCat = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await resCat.json()

  return {
    props: {
      _id: article._id,
      keyOverride: article.keyOverride || '',
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
    },
  }
}

export default Article
