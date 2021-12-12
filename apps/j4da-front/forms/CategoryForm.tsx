import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { IApp, ICategory, ISubCategories, ISubCategory } from '../types'
import { BASE_URL } from '../utils/constants'

interface ICategoryFormProps {
  props: ICategory & { apps: IApp[] }
}

const CategoryForm = ({ props }: ICategoryFormProps) => {
  const router = useRouter()
  const [subcats, setSubcats] = useState<ISubCategories>(props.subcategories)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'subcategories',
      keyName: 'title',
    }
  )

  const onSubmit = handleSubmit((data) => {
    if (props._id) {
      fetch(`${BASE_URL}/categories/${props._id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _id: props._id }),
      })
    } else {
      fetch(`${BASE_URL}/categories/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }

    router.replace('/categories')
  })
  const onAddSubcat = () => {
    const newCat: ISubCategories = { ...subcats }
    newCat.concat({ title: '', description: '' })
    // setSubcats(newCat)
  }
  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Cat Title</label>
          <input
            {...register('title')}
            defaultValue={props.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>Cat Description</label>
          <textarea
            {...register('description')}
            defaultValue={props.description}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <label>app</label>
          <select
            {...register('app')}
            defaultValue={props.app}
            name="category"
            className={`form-control ${errors.app ? 'is-invalid' : ''}`}
          >
            <option key="app.select" value="">
              Select App
            </option>
            {props.apps.map((app: IApp) => (
              <option key={app._id} value={app._id}>
                {app.title}
              </option>
            ))}
          </select>
        </div>
        {subcats.map((subcategory: ISubCategory, index: number) => (
          <div key={`${subcategory.title}_${index}`}>
            <div>
              <div className="form-group">
                <label>Subcat Title</label>
                <input
                  {...register(`subcategories.${index}.title` as const)}
                  key={subcategory.title}
                  defaultValue={subcategory.title}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
              </div>
              <div className="form-group">
                <label>Subcat Description</label>
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
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddSubcat}
          >
            Add Subcategory
          </button>
        </div>
      </form>
    </div>
  )
}

export { CategoryForm }
