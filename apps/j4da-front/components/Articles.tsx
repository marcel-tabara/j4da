import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { BASE_URL } from '../utils/constants'
import { IArticlesProps } from '../utils/types'

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
            <th>App</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(props?.articles ?? []).map((article) => (
            <tr key={article._id}>
              <td>
                <Link href="/articles/[_id]" as={`/articles/${article._id}`}>
                  {article.title || 'No title'}
                </Link>
              </td>
              <td>{article.app}</td>
              <td>
                <Icon.Trash onClick={onDelete} id={article._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export { Articles }
