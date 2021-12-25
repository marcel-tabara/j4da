import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useForm } from 'react-hook-form'
import { useArticleForm } from '../hooks/useArticleForm'
import { IApp, IArticle, ICategory, ISubCategory } from '../utils/types'

interface IArticleFormProps {
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeApp: (event: React.ChangeEvent<HTMLSelectElement>) => void
  subcategories: ISubCategory[]
  categories: ICategory[]
  article: IArticle
  allApps: IApp[]
}

const ArticleForm = ({
  onChangeCategory,
  onChangeApp,
  categories = [],
  subcategories = [],
  article,
  allApps,
}: IArticleFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IArticle>()

  const {
    bodyKeywords,
    selectedKeywords,
    onSubmit,
    onBodyChange,
    onChangeKeywords,
    onAddKeyword,
    onRemoveKeyword,
  } = useArticleForm({
    article,
    onChangeApp,
    onChangeCategory,
    watch,
    handleSubmit,
    setValue,
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>url</label>
          <input
            {...register('url')}
            defaultValue={article?.url}
            className={`form-control ${errors.url ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>title</label>
          <input
            {...register('title')}
            defaultValue={article?.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>slug</label>
          <input
            {...register('slug')}
            defaultValue={article?.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>app</label>
          <select
            {...register('app')}
            defaultValue={article?.app}
            name="app"
            onChange={onChangeApp}
            className={`form-control ${errors.app ? 'is-invalid' : ''}`}
          >
            <option key="app.select" value="">
              Select App
            </option>
            {(allApps || []).map((app: IApp) => (
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
            value={article?.category}
            name="category"
            onChange={onChangeCategory}
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          >
            <option key="category.select" value="">
              Select Category
            </option>
            {categories.map((category: ICategory) => (
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
            value={article?.subcategory}
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
            defaultValue={article?.images}
            className={`form-control ${errors.images ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>section</label>
          <input
            {...register('section')}
            defaultValue={article?.section}
            className={`form-control ${errors.section ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>keywords</label>
          <input
            {...register('keywords')}
            onBlur={onChangeKeywords}
            defaultValue={selectedKeywords.toString()}
            className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>authorName</label>
          <input
            {...register('authorName')}
            defaultValue={article?.authorName}
            className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>description</label>
          <textarea
            rows={10}
            {...register('description')}
            defaultValue={article?.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        {bodyKeywords && (
          <div className="form-group">
            <label>body keywords</label>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Total Keywords: {bodyKeywords.length}
                </Accordion.Header>
                <Accordion.Body className="accordion-box">
                  <div className="container">
                    {bodyKeywords.map((e) => (
                      <li
                        key={e.split(' ').join('_')}
                        id={e}
                        onClick={onAddKeyword}
                        className="accordion-list"
                      >
                        {e}
                      </li>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
        <div className="form-group">
          <label>selected keywords</label>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Total Selected Keywords: {selectedKeywords.length}
              </Accordion.Header>
              <Accordion.Body className="accordion-box">
                <div className="container">
                  <ul className="list-unstyled card-columns">
                    {selectedKeywords.map((e) => (
                      <li
                        key={e.split(' ').join('_').concat('_selected')}
                        className="accordion-list"
                        id={e}
                        onClick={onRemoveKeyword}
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="form-group">
          <label>body</label>
          <textarea
            rows={20}
            {...register('body')}
            defaultValue={article?.body}
            onBlur={onBodyChange}
            className={`form-control ${errors.body ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>publisherName</label>
          <input
            {...register('publisherName')}
            defaultValue={article?.publisherName}
            className={`form-control ${
              errors.publisherName ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <label>publisherLogo</label>
          <input
            {...register('publisherLogo')}
            defaultValue={article?.publisherLogo}
            className={`form-control ${
              errors.publisherLogo ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <label>dateCreated</label>
          <input
            {...register('dateCreated')}
            defaultValue={article?.dateCreated}
            className={`form-control ${errors.dateCreated ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>datePublished</label>
          <input
            {...register('datePublished')}
            defaultValue={article?.datePublished}
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
          <label>keyOverride</label>
          <input
            {...register('keyOverride')}
            defaultValue={article?.keyOverride}
            className={`form-control ${errors.keyOverride ? 'is-invalid' : ''}`}
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
