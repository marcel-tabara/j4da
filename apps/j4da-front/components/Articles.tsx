import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux'
import { articleService } from '../services'
import { IArticlesProps } from '../utils/types'

const Articles = (props: IArticlesProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const onAddArticle = () => router.replace('/articles/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      dispatch(articleService.actions.deleteArticle(e.target.id))
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
            <th>Cat</th>
            <th>Subcat</th>
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
              <td>{article.app.title}</td>
              <td>{article.category.title}</td>
              <td>{article.subcategory}</td>
              <td align="right">
                <Icon.Trash
                  onClick={onDelete}
                  id={article._id}
                  className="pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export { Articles }
