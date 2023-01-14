import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { appService } from '../services'
import { IApp } from '../utils/types'

interface IAppFormProps {
  appById: IApp
}

const AppForm = ({ appById }: IAppFormProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApp>()
  const onSubmit = handleSubmit((data) => {
    appById._id
      ? dispatch(
          appService.actions.updateApp({
            ...data,
            _id: appById._id,
            dateModified: new Date().toISOString(),
          })
        )
      : dispatch(
          appService.actions.createApp({
            ...data,
            dateModified: new Date().toISOString(),
          })
        )

    router.replace('/apps')
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h6>url</h6>
          <input
            {...register('url')}
            defaultValue={appById?.url}
            className={`form-control ${errors.url ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>title</h6>
          <input
            {...register('title')}
            defaultValue={appById?.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>slug</h6>
          <input
            {...register('slug')}
            defaultValue={appById?.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>image</h6>
          <input
            {...register('image')}
            defaultValue={appById?.image}
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>section</h6>
          <input
            {...register('section')}
            defaultValue={appById?.section}
            className={`form-control ${errors.section ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>keywords</h6>
          <input
            {...register('keywords')}
            defaultValue={appById?.keywords.toString()}
            className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>authorName</h6>
          <input
            {...register('authorName')}
            defaultValue={appById?.authorName}
            className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>description</h6>
          <textarea
            {...register('description')}
            rows={10}
            defaultValue={appById?.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>body</h6>
          <textarea
            {...register('body')}
            rows={20}
            defaultValue={appById?.body}
            className={`form-control ${errors.body ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>publisherName</h6>
          <input
            {...register('publisherName')}
            defaultValue={appById?.publisherName}
            className={`form-control ${
              errors.publisherName ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <h6>publisherLogo</h6>
          <input
            {...register('publisherLogo')}
            defaultValue={appById?.publisherLogo}
            className={`form-control ${
              errors.publisherLogo ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <h6>dateCreated</h6>
          <input
            {...register('dateCreated')}
            defaultValue={appById?.dateCreated}
            className={`form-control ${errors.dateCreated ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>datePublished</h6>
          <input
            {...register('datePublished')}
            defaultValue={appById?.datePublished}
            className={`form-control ${
              errors.datePublished ? 'is-invalid' : ''
            }`}
          />
        </div>
        <div className="form-group">
          <h6>keyOverride</h6>
          <input
            {...register('keyOverride')}
            defaultValue={appById?.keyOverride}
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

export { AppForm }
