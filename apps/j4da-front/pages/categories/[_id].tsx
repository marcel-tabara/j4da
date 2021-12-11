import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Main } from '../../templates/Main'
import { ICategory, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const Category = (props: ICategory) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>()
  const onSubmit = handleSubmit((data) => console.log(data))
  const onClick = () => undefined

  return (
    <Main>
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
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={onClick}>
              Save
            </button>
          </div>
        </form>
      </div>
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/categories`)
  const categories: ICategory[] = await res.json()

  return {
    paths: categories.map((category) => ({
      params: {
        _id: category._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ICategory, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/categories/${params._id}`)
  const category: ICategory = await res.json()

  return {
    props: {
      _id: category._id,
      title: category.title,
      description: category.description,
      subcategories: category.subcategories,
    },
  }
}

export default Category
