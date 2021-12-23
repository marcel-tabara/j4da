import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { appService } from '../services'
import { IApp } from '../utils/types'

interface IAppFormProps {
  props: IApp
}

const AppForm = ({ props }: IAppFormProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApp>()
  const onSubmit = handleSubmit((data) => {
    if (props._id) {
      dispatch(appService.actions.updateApp({ ...data, _id: props._id }))
    } else {
      dispatch(appService.actions.createApp(data))
    }

    router.replace('/apps')
  })

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

export { AppForm }
