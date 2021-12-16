import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useForm } from 'react-hook-form'
import { IApp, IArticle, ICategory, ISubCategory } from '../types'
import { extractKeywords } from '../utils/analysis'
import { BASE_URL } from '../utils/constants'

interface IArticleFormProps {
  props: IArticle & { categories: ICategory[] } & { apps: IApp[] }
  onChaneCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onChaneApp: (event: React.ChangeEvent<HTMLSelectElement>) => void
  subcategories: ISubCategory[]
  categories: ICategory[]
}

const ArticleForm = ({
  props,
  onChaneCategory,
  onChaneApp,
  categories = [],
  subcategories = [],
}: IArticleFormProps) => {
  const router = useRouter()
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticle>()
  const getDefaultBodyKeywords = () => extractKeywords(props.body)
  const [bodyKeywords, setBodyKeywords] = useState(getDefaultBodyKeywords())
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    props.keywords.split(',')
  )

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = handleSubmit((data) => {
    if (props._id) {
      fetch(`${BASE_URL}/articles/${props._id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _id: props._id }),
      })
    } else {
      fetch(`${BASE_URL}/articles/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }

    const oldKeywords = props.keywords.split(',')
    const newKeywords = data.keywords.split(',')

    const a = oldKeywords.filter((e) => !newKeywords.includes(e))
    const b = newKeywords.filter((e) => !oldKeywords.includes(e))

    if (a.length > 0) {
      fetch(`${BASE_URL}/keywords/bulkremove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
      })
    }

    if (b.length > 0) {
      fetch(`${BASE_URL}/keywords/bulkupsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(b),
      })
    }

    router.replace('/articles')
  })
  const onBodyChange = (e) => {
    extractKeywords(e.target.value)
  }
  const onAddKeyword = (event) => {
    const newSelectedKeywords = [...selectedKeywords].concat(event.target.id)
    setSelectedKeywords(newSelectedKeywords)
  }
  const onRemoveKeyword = (event) => {
    const newSelectedKeywords = selectedKeywords.filter(
      (e) => e !== event.target.id
    )
    setSelectedKeywords(newSelectedKeywords)
  }

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
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
          <label>slug</label>
          <input
            {...register('slug')}
            defaultValue={props.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>app</label>
          <select
            {...register('app')}
            defaultValue={props.app}
            name="app"
            onChange={onChaneApp}
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
          <label>body keywords</label>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Total Keywords: {bodyKeywords.length}
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  {bodyKeywords.map((e) => (
                    <a key={e[0]} id={e[0]} onClick={onAddKeyword}>
                      {e[0]} : {e[1]}
                    </a>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="form-group">
          <label>body keywords</label>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Total Selected Keywords: {selectedKeywords.length}
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <ul className="list-unstyled card-columns">
                    {selectedKeywords.map((e) => (
                      <li key={e}>
                        <a id={e} onClick={onRemoveKeyword}>
                          {e}
                        </a>
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
            {...register('body')}
            defaultValue={props.body}
            // onChange={onBodyChange}
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
          <label>keyOverride</label>
          <input
            {...register('keyOverride')}
            defaultValue={props.keyOverride}
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
