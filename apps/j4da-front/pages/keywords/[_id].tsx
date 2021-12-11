import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Main } from '../../templates/Main'
import { IKeyword, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const Keyword = (props: IKeyword) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IKeyword>()
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
  const res = await fetch(`${BASE_URL}/keywords`)
  const keywords: IKeyword[] = await res.json()

  return {
    paths: keywords.map((keyword) => ({
      params: {
        _id: keyword._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IKeyword, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/keywords/${params._id}`)
  const keyword: IKeyword = await res.json()

  // const content = await markdownToHtml(post.body || '')

  return {
    props: {
      _id: keyword._id,
      title: keyword.title,
      description: keyword.description,
    },
  }
}

export default Keyword
