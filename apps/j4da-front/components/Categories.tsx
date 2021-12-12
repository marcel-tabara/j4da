import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { ICategoriesProps } from '../types'
import { BASE_URL } from '../utils/constants'

const Categories = (props: ICategoriesProps) => {
  const router = useRouter()
  const onAddCategory = () => router.replace('/categories/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      fetch(`${BASE_URL}/categories/${e.target.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.replace('/categories')
    }
  }
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddCategory}>
        Add Category
      </button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Categories</th>
            <th>Actions</th>
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

export { Categories }
