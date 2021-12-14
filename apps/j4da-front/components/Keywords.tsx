import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { IKeywordsProps } from '../types'
import { BASE_URL } from '../utils/constants'

const Keywords = (props: IKeywordsProps) => {
  const router = useRouter()
  const onAddKeyword = () => router.replace('/keywords/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      fetch(`${BASE_URL}/keywords/${e.target.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.replace('/keywords')
    }
  }
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddKeyword}>
        Add Keyword
      </button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Keywords</th>
          </tr>
        </thead>
        <tbody>
          {props.keywords.map((keyword) => (
            <tr key={keyword._id}>
              <td>
                <Link href="/keywords/[_id]" as={`/keywords/${keyword._id}`}>
                  {keyword.title}
                </Link>
              </td>
              <td>
                <Icon.Trash onClick={onDelete} id={keyword._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export { Keywords }
