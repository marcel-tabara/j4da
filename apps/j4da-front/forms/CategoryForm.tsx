import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { categoryService } from '../services'
import { IApp, ICategory } from '../utils/types'

interface ICategoryFormProps {
  categoryById: ICategory
  apps: IApp[]
}

const CategoryForm = ({ categoryById, apps }: ICategoryFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>()

  const onSubmit = handleSubmit((data) => {
    categoryById._id
      ? dispatch(
          categoryService.actions.updateCategory({
            ...data,
            _id: categoryById._id,
          })
        )
      : dispatch(categoryService.actions.createCategory(data))

    router.replace('/categories')
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <h3>Category</h3>
        <div className="form-group">
          <h6>Title</h6>
          <input
            {...register('title')}
            defaultValue={categoryById.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Slug</h6>
          <input
            {...register('slug')}
            defaultValue={categoryById.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Description</h6>
          <textarea
            {...register('description')}
            defaultValue={categoryById.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>App</h6>
          <select
            {...register('app')}
            defaultValue={categoryById?.app?._id}
            name="app"
            className={`form-control ${errors.app ? 'is-invalid' : ''}`}
          >
            <option key="app.select" value="">
              Select App
            </option>
            {(apps || []).map((app: IApp) => (
              <option key={app._id} value={app._id}>
                {app.title}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <div className="column">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { CategoryForm }
