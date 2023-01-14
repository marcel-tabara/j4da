import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { keywordService } from '../services'
import { IKeyword } from '../utils/types'

interface IKeywordFormProps {
  keywordById: IKeyword
}

const KeywordForm = ({ keywordById }: IKeywordFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IKeyword>()
  const onSubmit = handleSubmit((data) => {
    keywordById._id
      ? dispatch(
          keywordService.actions.updateKeyword({
            ...data,
            _id: keywordById._id,
          })
        )
      : dispatch(keywordService.actions.createKeyword(data))

    router.replace('/keywords')
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h6>Keyword Title</h6>
          <input
            {...register('title')}
            defaultValue={keywordById?.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Article</h6>
          <textarea
            {...register('article')}
            defaultValue={keywordById?.article?._id}
            className={`form-control ${errors.article ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Article Link</h6>
          <input
            {...register('articleLink')}
            defaultValue={keywordById?.articleLink?._id}
            className={`form-control ${errors.articleLink ? 'is-invalid' : ''}`}
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
