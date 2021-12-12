import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { IAppsProps } from '../types'
import { BASE_URL } from '../utils/constants'

const Apps = (props: IAppsProps) => {
  const router = useRouter()
  const onAddApp = () => router.replace('/apps/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      fetch(`${BASE_URL}/apps/${e.target.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.replace('/apps')
    }
  }
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddApp}>
        Add App
      </button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Apps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.apps.map((elt) => (
            <tr key={elt._id}>
              <td>
                <Link href="/apps/[_id]" as={`/apps/${elt._id}`}>
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

export { Apps }
