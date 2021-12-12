import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IApp } from '../types'
import { BASE_URL } from '../utils/constants'

interface IAppFormProps {
  props: IApp
}

const AppForm = ({ props }: IAppFormProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApp>()
  const onSubmit = handleSubmit((data) => {
    if (props._id) {
      fetch(`${BASE_URL}/apps/${props._id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _id: props._id }),
      })
    } else {
      fetch(`${BASE_URL}/apps/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }

    router.replace('/apps')
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>App Title</label>
          <input
            {...register('title')}
            defaultValue={props.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>App Description</label>
          <textarea
            {...register('description')}
            defaultValue={props.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
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
