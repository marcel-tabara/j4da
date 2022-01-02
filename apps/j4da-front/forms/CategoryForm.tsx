import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { categoryService } from '../services'
import { IApp, ICategory, ISubCategory } from '../utils/types'

interface ICategoryFormProps {
  categoryById: ICategory
  apps: IApp[]
}

const CategoryForm = ({ categoryById, apps }: ICategoryFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [subcats, setSubcats] = useState<ISubCategory[]>(
    categoryById.subcategories || []
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>()

  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      subcategories: data.subcategories.filter((e) => e.title.length > 0),
    }
    categoryById._id
      ? dispatch(
          categoryService.actions.updateCategory({
            ...newData,
            _id: categoryById._id,
          })
        )
      : dispatch(categoryService.actions.createCategory(newData))

    router.replace('/categories')
  })
  const onAddSubcat = () => {
    const newCat: ISubCategory[] = [...subcats]
    newCat.push({} as ISubCategory)
    setSubcats(newCat)
  }
  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h6>Cat Title</h6>
          <input
            {...register('title')}
            defaultValue={categoryById.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Cat Slug</h6>
          <input
            {...register('slug')}
            defaultValue={categoryById.slug}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Cat Description</h6>
          <textarea
            {...register('description')}
            defaultValue={categoryById.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>app</h6>
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
        <h3>Subcategories</h3>

        {(subcats || []).map((subcategory: ISubCategory, index: number) => (
          <div key={`${subcategory.title}_${index}`}>
            <div>
              <div className="form-group">
                <h6>Subcat Title</h6>
                <input
                  {...register(`subcategories.${index}.title` as const)}
                  key={subcategory.title}
                  defaultValue={subcategory.title}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
              </div>
              <div className="form-group">
                <h6>Subcat Slug</h6>
                <input
                  {...register(`subcategories.${index}.slug` as const)}
                  key={subcategory.slug}
                  defaultValue={subcategory.slug}
                  className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                />
              </div>
              <div className="form-group">
                <h6>Subcat Description</h6>
                <textarea
                  {...register(`subcategories.${index}.description` as const)}
                  key={`${subcategory.title}_descr`}
                  defaultValue={subcategory.description}
                  className={`form-control ${
                    errors.description ? 'is-invalid' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="row">
          <div className="column">
            <button
              type="button"
              className="btn btn-primary column"
              onClick={onAddSubcat}
            >
              Add Subcategory
            </button>
          </div>
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
