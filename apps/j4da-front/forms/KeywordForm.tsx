import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { keywordService } from '../services'
import { IKeyword } from '../utils/types'

interface IKeywordFormProps {
  props: IKeyword
}

const KeywordForm = ({ props }: IKeywordFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IKeyword>()
  const onSubmit = handleSubmit((data) => {
    if (props._id) {
      dispatch(
        keywordService.actions.updateKeyword({ ...data, _id: props._id })
      )
    } else {
      dispatch(keywordService.actions.createKeyword(data))
    }

    router.replace('/keywords')
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Keyword Title</label>
          <input
            {...register('title')}
            defaultValue={props.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>Keyword Description</label>
          <textarea
            {...register('description')}
            defaultValue={props.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>Keyword Count</label>
          <input
            {...register('count')}
            defaultValue={props.count}
            className={`form-control ${errors.count ? 'is-invalid' : ''}`}
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
