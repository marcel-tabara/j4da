import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { IArticlesProps } from '../types'

const Articles = (props: IArticlesProps) => {
  const router = useRouter()
  const onAddArticle = () => router.replace('/articles/add')
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddArticle}>
        Add Article
      </button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Articles</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export { Articles }
