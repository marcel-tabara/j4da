import Link from 'next/link'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { IKeywordsProps } from '../types'

const Keywords = (props: IKeywordsProps) => (
  <>
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Keywords</th>
        </tr>
      </thead>
      <tbody>
        {props.keywords.map((elt) => (
          <tr key={elt._id}>
            <td>
              <Link href="/keywords/[_id]" as={`/keywords/${elt._id}`}>
                {elt.title}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
)

export { Keywords }
