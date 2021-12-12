import React from 'react'
import { useForm } from 'react-hook-form'
import { ICategory, ISubCategories, ISubCategory } from '../types'

interface ISubCategoryFormProps {
  subcategories: ISubCategories
}

const SubCategoryForm = ({ subcategories }: ISubCategoryFormProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<ICategory>()
  return (
    <>
      {subcategories.map((subcategory: ISubCategory) => (
        <div key={subcategory.title}>
          <div className="form-group">
            <label>Title</label>
            <input
              {...register('title')}
              key={subcategory.title}
              defaultValue={subcategory.title}
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              {...register('description')}
              key={subcategory.description}
              defaultValue={subcategory.description}
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
            />
          </div>
        </div>
      ))}
    </>
  )
}

export { SubCategoryForm }
