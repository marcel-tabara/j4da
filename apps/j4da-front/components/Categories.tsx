import Link from 'next/link'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { ICategoriesProps } from '../types'

const Categories = (props: ICategoriesProps) => (
  <>
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Categories</th>
        </tr>
      </thead>
      <tbody>
        {props.categories.map((elt) => (
          <tr key={elt._id}>
            <td>
              <Link href="/categories/[_id]" as={`/categories/${elt._id}`}>
                {elt.title}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
)

export { Categories }
