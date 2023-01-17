import { ChangeEvent } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Controller, useForm } from 'react-hook-form'
import { MDEWrapper } from '../components/MDEWrapper'
import { useArticleForm } from '../hooks/useArticleForm'
import {
  IApp,
  IArticle,
  IArticleSave,
  ICategory,
  ISubCategory,
} from '../utils/types'

interface IArticleFormProps {
  onChangeCategory: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeApp: (event: ChangeEvent<HTMLSelectElement>) => void
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
    control,
    formState: { errors },
  } = useForm<IArticleSave>()

  const {
    onSubmit,
    onBodyChange,
    onChangeTitle,
    onAddKeyword,
    onAddKeywords,
    onRemoveKeyword,
    selectedKeywords,
    extractedKeywords,
  } = useArticleForm({
    article,
    onChangeApp,
    onChangeCategory,
    handleSubmit,
    setValue,
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h6>url</h6>
          <input
            {...register('url')}
            defaultValue={article?.url}
            className={`form-control ${errors.url ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>title</h6>
          <input
            {...register('title')}
            defaultValue={article?.title}
            onChange={onChangeTitle}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>slug</h6>
          <input
            {...register('slug')}
            defaultValue={article?.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>app</h6>
          <select
            {...register('app')}
            defaultValue={article?.app?._id}
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
          <h6>category</h6>
          <Controller
            control={control}
            name="category"
            defaultValue={article?.category?._id}
            render={({ field: { value, onChange } }) => (
              <select
                {...register('category')}
                value={value}
                onChange={(e) => {
                  onChangeCategory(e)
                  onChange(e)
                }}
                className={`form-control ${
                  errors.category ? 'is-invalid' : ''
                }`}
              >
                <option key="category.select" value="">
                  Select Category
                </option>
                {(categories || []).map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="form-group">
          <h6>subcategory</h6>
          <Controller
            control={control}
            name="subcategory"
            defaultValue={article?.subcategory?._id}
            render={({ field: { value, onChange } }) => (
              <select
                {...register('subcategory')}
                value={value}
                onChange={onChange}
                className={`form-control ${
                  errors.subcategory ? 'is-invalid' : ''
                }`}
              >
                <option key="subcategory.select" value="">
                  Select SubCategory
                </option>
                {(subcategories || []).map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.title}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="form-group">
          <h6>image</h6>
          <input
            {...register('image')}
            defaultValue={article?.image}
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>authorName</h6>
          <input
            {...register('authorName')}
            defaultValue={article?.authorName}
            className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>description</h6>
          <textarea
            rows={10}
            {...register('description')}
            defaultValue={article?.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        {extractedKeywords && (
          <div className="form-group">
            <h6>extracted keywords</h6>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Total Extracted Keywords: {extractedKeywords.length}
                </Accordion.Header>
                <Accordion.Body className="accordion-box">
                  <div className="container">
                    {extractedKeywords.map((e, idx) => {
                      const existing = selectedKeywords
                        .map((s) => s.title)
                        .includes(e.title)
                      return (
                        <li
                          key={e.title + '_' + idx}
                          id={e.title}
                          onClick={!existing ? onAddKeyword : undefined}
                        >
                          {e.title}{' '}
                          <b>
                            {e?.articleLink?.url !== e.article.url
                              ? e?.articleLink?.url
                              : ''}
                          </b>{' '}
                          {e?.articleLink?._id !== e?.article?._id
                            ? e?.articleLink?._id
                            : ''}
                          {existing && <b> existing</b>}
                        </li>
                      )
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
        {selectedKeywords && (
          <div className="form-group">
            <h6>selected keywords</h6>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Total Selected Keywords: {selectedKeywords.length}
                </Accordion.Header>
                <Accordion.Body className="accordion-box">
                  <div className="container">
                    {selectedKeywords.map((e) => (
                      <li
                        key={e.title + e?.article?._id}
                        id={e.title}
                        onClick={onRemoveKeyword}
                      >
                        {e.title}{' '}
                        <b>
                          {article._id !== e?.articleLink?._id &&
                            e?.articleLink?.url}
                        </b>{' '}
                        {article._id !== e?.articleLink?._id &&
                          e?.articleLink?._id}
                        {!(extractedKeywords || [])
                          .map((e) => e.title)
                          .includes(e.title) && <b> non existing</b>}
                      </li>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
        <div className="form-group">
          <input
            {...(register('keywords'),
            {
              onBlur: (e) => onAddKeywords(e),
            })}
            defaultValue={selectedKeywords.map((e) => e.title)}
            className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>body mde</h6>
          <Controller
            control={control}
            name="body"
            defaultValue={article?.body}
            render={({ field: { value, onChange } }) => (
              <MDEWrapper
                value={value}
                onChange={onChange}
                onBlur={() => onBodyChange(value)}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h6>publisherName</h6>
          <input
            {...register('publisherName')}
            defaultValue={article?.publisherName}
            className={`form-control ${
              errors.publisherName ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <h6>publisherLogo</h6>
          <input
            {...register('publisherLogo')}
            defaultValue={article?.publisherLogo}
            className={`form-control ${
              errors.publisherLogo ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <h6>dateCreated</h6>
          <input
            {...register('dateCreated')}
            defaultValue={article?.dateCreated}
            className={`form-control ${errors.dateCreated ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>datePublished</h6>
          <input
            {...register('datePublished')}
            defaultValue={article.datePublished}
            className={`form-control ${
              errors.datePublished ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <h6>keyOverride</h6>
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
