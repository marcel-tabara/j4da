import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { subcategoryService } from '../services'
import { ICategory, ISubCategory } from '../utils/types'

interface ISubcategoryFormProps {
  subcategoryById: ISubCategory
  categories: ICategory[]
}

const SubcategoryForm = ({
  subcategoryById,
  categories,
}: ISubcategoryFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubCategory>()

  const onSubmit = handleSubmit((data) => {
    subcategoryById._id
      ? dispatch(
          subcategoryService.actions.updateSubcategory({
            ...data,
            _id: subcategoryById._id,
          })
        )
      : dispatch(subcategoryService.actions.createSubcategory(data))

    router.replace('/subcategories')
  })

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <h3>Subcategory</h3>
        <div className="form-group">
          <h6>Title</h6>
          <input
            {...register('title')}
            defaultValue={subcategoryById.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Slug</h6>
          <input
            {...register('slug')}
            defaultValue={subcategoryById.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Description</h6>
          <textarea
            {...register('description')}
            defaultValue={subcategoryById.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Category</h6>
          <select
            {...register('category')}
            defaultValue={subcategoryById?.category?._id}
            name="category"
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          >
            <option key="category.select" value="">
              Select Category
            </option>
            {(categories || []).map((category: ICategory) => (
              <option key={category._id} value={category._id}>
                {category.title}
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

export { SubcategoryForm }
