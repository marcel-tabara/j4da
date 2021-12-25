import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux'
import { appService } from '../services'
import { IAppsProps } from '../utils/types'

const Apps = (props: IAppsProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const onAddApp = () => router.replace('/apps/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      dispatch(appService.actions.deleteApp(e.target.id))
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
          {(props?.apps ?? []).map((app) => (
            <tr key={app._id}>
              <td>
                <Link href="/apps/[_id]" as={`/apps/${app._id}`}>
                  {app.title}
                </Link>
              </td>
              <td align="right">
                <Icon.Trash
                  onClick={onDelete}
                  id={app._id}
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

export { Apps }
