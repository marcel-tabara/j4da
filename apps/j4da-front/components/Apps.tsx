import Link from 'next/link'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { IAppsProps } from '../types'

const Apps = (props: IAppsProps) => (
  <>
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Apps</th>
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
          </tr>
        ))}
      </tbody>
    </Table>
  </>
)

export { Apps }
