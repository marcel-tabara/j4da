import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { IArticlesProps } from '../types'
import { BASE_URL } from '../utils/constants'

const Articles = (props: IArticlesProps) => {
  const router = useRouter()
  const onAddArticle = () => router.replace('/articles/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      fetch(`${BASE_URL}/articles/${e.target.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.replace('/articles')
    }
  }
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddArticle}>
        Add Article
      </button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Articles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map((elt) => (
            <tr key={elt._id}>
              <td>
                <Link href="/articles/[_id]" as={`/articles/${elt._id}`}>
                  {elt.title}
                </Link>
              </td>
              <td>
                <Icon.ArrowRight onClick={onDelete} id={elt._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export { Articles }
