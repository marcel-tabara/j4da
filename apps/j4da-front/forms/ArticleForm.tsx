import React from 'react'
import { useForm } from 'react-hook-form'
import {
  IApp,
  IArticle,
  ICategory,
  ISubCategories,
  ISubCategory,
} from '../types'
import { BASE_URL } from '../utils/constants'

interface IArticleFormProps {
  props: IArticle & { categories: ICategory[] } & { apps: IApp[] }
  onChaneCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
  subcategories: ISubCategories
  apps: IApp[]
}

const ArticleForm = ({
  props,
  onChaneCategory,
  subcategories,
  apps,
}: IArticleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticle>()
  const onSubmit = handleSubmit((data) => {
    fetch(`${BASE_URL}/articles/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, _id: props._id }),
    })
  })
  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>keyOverride</label>
          <input
            {...register('keyOverride')}
            defaultValue={props.keyOverride}
            className={`form-control ${errors.keyOverride ? 'is-invalid' : ''}`}
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
          <label>app</label>
          <select
            {...register('app')}
            defaultValue={props.app}
            name="category"
            className={`form-control ${errors.app ? 'is-invalid' : ''}`}
          >
            <option key="app.select" value="">
              Select App
            </option>
            {props.apps.map((app: IApp) => (
              <option key={app._id} value={app._id}>
                {app.title}
              </option>
            ))}
          </select>
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
            className={`form-control ${errors.subcategory ? 'is-invalid' : ''}`}
          >
            <option key="subcategory.select" value="">
              Select SubCategory
            </option>
            {(subcategories || []).map((subcategory: ISubCategory) => (
              <option key={subcategory.title} value={subcategory.title}>
                {subcategory.title}
              </option>
            ))}
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
            className={`form-control ${errors.dateCreated ? 'is-invalid' : ''}`}
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
            className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>description</label>
          <textarea
            {...register('description')}
            defaultValue={props.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
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
  )
}

export { ArticleForm }
