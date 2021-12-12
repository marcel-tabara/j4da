import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Table from 'react-bootstrap/Table'
import { ICategoriesProps } from '../types'

const Categories = (props: ICategoriesProps) => {
  const router = useRouter()
  const onAddCategory = () => router.replace('/categories/add')
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddCategory}>
        Add Category
      </button>
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
}

export { Categories }
