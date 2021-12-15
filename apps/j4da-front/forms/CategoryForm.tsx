import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IApp, ICategory, ISubCategory } from '../types'
import { BASE_URL } from '../utils/constants'

interface ICategoryFormProps {
  props: ICategory & { apps: IApp[] }
}

const CategoryForm = ({ props }: ICategoryFormProps) => {
  const router = useRouter()
  const [subcats, setSubcats] = useState<ISubCategory[]>(props.subcategories)
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
    if (props._id) {
      fetch(`${BASE_URL}/categories/${props._id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newData, _id: props._id }),
      })
    } else {
      fetch(`${BASE_URL}/categories/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
    }

    router.replace('/categories')
  })
  const onAddSubcat = () => {
    const newCat: ISubCategory[] = [...subcats]
    newCat.push({ title: '', description: '' })
    setSubcats(newCat)
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
            name="app"
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
        <h3>Subcategories</h3>

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

        <div className="btn-group btn-block">
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
