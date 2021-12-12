import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { IKeywordsProps } from '../types'

const Keywords = (props: IKeywordsProps) => {
  const router = useRouter()
  const onAddKeyword = () => router.replace('/keywords/add')
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
}

export { Keywords }
