import React from 'react'
import { useForm } from 'react-hook-form'
import { IKeyword } from '../types'
import { BASE_URL } from '../utils/constants'

interface IKeywordFormProps {
  props: IKeyword
}

const KeywordForm = ({ props }: IKeywordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IKeyword>()
  const onSubmit = handleSubmit((data) => {
    fetch(`${BASE_URL}/keywords/update`, {
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
          <label>Title</label>
          <input
            {...register('title')}
            defaultValue={props.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
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

export { KeywordForm }
