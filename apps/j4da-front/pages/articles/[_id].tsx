import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Main } from '../../templates/Main'
import { IArticle, IArticles, IUrl } from '../../types'
import { BASE_URL } from '../../utils/constants'

const Article = (props: IArticle) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticle>()
  const onSubmit = handleSubmit((data) => console.log(data))

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
            <label>Slug</label>
            <input
              {...register('slug')}
              defaultValue={props.slug}
              className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>image</label>
            <input
              {...register('image')}
              defaultValue={props.image}
              className={`form-control ${errors.image ? 'is-invalid' : ''}`}
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
            <label>Content</label>
            <textarea
              {...register('body')}
              defaultValue={props.body}
              className={`form-control ${errors.body ? 'is-invalid' : ''}`}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths<IUrl> = async () => {
  const res = await fetch(`${BASE_URL}/articles`)
  const articles: IArticles = await res.json()
  const posts = articles.data

  return {
    paths: posts.map((post) => ({
      params: {
        _id: post._id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IArticle, IUrl> = async ({
  params,
}) => {
  const res = await fetch(`${BASE_URL}/articles/${params._id}`)
  const post: IArticle = await res.json()

  return {
    props: {
      _id: post._id,
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      body: post.body,
      slug: post.slug,
      author: post.author,
    },
  }
}

export default Article
