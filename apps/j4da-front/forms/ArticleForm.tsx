import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelectors } from '../hooks/useSelectors'
import {
  articleByIdService,
  articleService,
  extractedKeywordsService,
} from '../services'
import { BASE_URL } from '../utils/constants'
import { IApp, IArticle, ICategory, ISubCategory } from '../utils/types'

interface IArticleFormProps {
  onChaneCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onChaneApp: (event: React.ChangeEvent<HTMLSelectElement>) => void
  subcategories: ISubCategory[]
  categories: ICategory[]
  article: IArticle
  allApps: IApp[]
}

const ArticleForm = ({
  onChaneCategory,
  onChaneApp,
  categories = [],
  subcategories = [],
  article,
  allApps,
}: IArticleFormProps) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(articleService.actions.getArticles())
  }, [dispatch])
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IArticle>()

  const [bodyKeywords, setBodyKeywords] = useState([])
  const [defaultBodyKeywords, setDefaultBodyKeywords] = useState([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    !article?.keywords?.length ? [] : article.keywords.split(',')
  )

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const extractKeywords = useCallback(
    (text: string) => {
      dispatch(extractedKeywordsService.actions.extractKeywords(text))
    },
    [dispatch]
  )

  const { extractedKeywords } = useSelectors()

  useEffect(
    () => extractKeywords(article.body),
    [article.body, extractKeywords]
  )
  useEffect(() => {
    setBodyKeywords(extractedKeywords)
  }, [extractedKeywords])
  useEffect(() => {
    extractedKeywords &&
      !defaultBodyKeywords.length &&
      setDefaultBodyKeywords(extractedKeywords)
  }, [extractedKeywords, defaultBodyKeywords])

  const onSubmit = handleSubmit((data) => {
    if (article._id) {
      dispatch(
        articleByIdService.actions.setArticleById(
          JSON.stringify({ ...data, _id: article._id })
        )
      )
    } else {
      dispatch(articleByIdService.actions.createArticle(data))
    }

    const oldKeywords = article.keywords.split(',')
    const newKeywords = data.keywords.split(',')

    const a = oldKeywords.filter((e) => !newKeywords.includes(e))
    const b = newKeywords.filter((e) => !oldKeywords.includes(e))

    if (a.length > 0) {
      // dispatch(keywordService.actions.)
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
  const onBodyChange = async (e) => {
    extractKeywords(e.target.value)
  }
  const onAddKeyword = (event) => {
    const newSelectedKeywords = [...selectedKeywords].concat(event.target.id)
    setSelectedKeywords(newSelectedKeywords)
    setValue('keywords', newSelectedKeywords.toString())

    const newBodyKeywords = bodyKeywords.filter(
      (keyword) => keyword !== event.target.id
    )
    setBodyKeywords(newBodyKeywords)
  }
  const onRemoveKeyword = (event) => {
    const newSelectedKeywords = selectedKeywords.filter(
      (e) => e !== event.target.id
    )
    setSelectedKeywords(newSelectedKeywords)
    setValue('keywords', newSelectedKeywords.toString())

    const newBodyKeywords = defaultBodyKeywords.filter(
      (keyword) => !newSelectedKeywords.includes(keyword)
    )
    setBodyKeywords(newBodyKeywords)
  }
  const onChangeKeywords = (e) => {
    setSelectedKeywords(e.target.value.split(','))
  }

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>url</label>
          <input
            {...register('url')}
            defaultValue={article.url}
            className={`form-control ${errors.url ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>title</label>
          <input
            {...register('title')}
            defaultValue={article.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>slug</label>
          <input
            {...register('slug')}
            defaultValue={article.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>app</label>
          <select
            {...register('app')}
            defaultValue={article.app}
            name="app"
            onChange={onChaneApp}
            className={`form-control ${errors.app ? 'is-invalid' : ''}`}
          >
            <option key="app.select" value="">
              Select App
            </option>
            {allApps.map((app: IApp) => (
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
            defaultValue={article.category}
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
            defaultValue={article.images}
            className={`form-control ${errors.images ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>section</label>
          <input
            {...register('section')}
            defaultValue={article.section}
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
            defaultValue={article.authorName}
            className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>description</label>
          <textarea
            {...register('description')}
            defaultValue={article.description}
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
            {...register('body')}
            defaultValue={article.body}
            onBlur={onBodyChange}
            className={`form-control ${errors.body ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>publisherName</label>
          <input
            {...register('publisherName')}
            defaultValue={article.publisherName}
            className={`form-control ${
              errors.publisherName ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <label>publisherLogo</label>
          <input
            {...register('publisherLogo')}
            defaultValue={article.publisherLogo}
            className={`form-control ${
              errors.publisherLogo ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <label>dateCreated</label>
          <input
            {...register('dateCreated')}
            defaultValue={article.dateCreated}
            className={`form-control ${errors.dateCreated ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>datePublished</label>
          <input
            {...register('datePublished')}
            defaultValue={article.datePublished}
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
            defaultValue={article.keyOverride}
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
