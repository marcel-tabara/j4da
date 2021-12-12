import Link from 'next/link'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { IArticlesProps } from '../types'

const Articles = (props: IArticlesProps) => (
  <>
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Articles</th>
          <th>
            <Link href="/articles/new" as={`/articles/new`}>
              Add Article
            </Link>
          </th>
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

export { Articles }
