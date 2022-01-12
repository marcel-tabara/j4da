import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux'
import { subcategoryService } from '../services'
import { ISubcategoriesProps } from '../utils/types'

const Subcategories = ({ subcategories }: ISubcategoriesProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const onAddCategory = () => router.replace('/subcategories/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      dispatch(subcategoryService.actions.deleteSubcategory(e.target.id))
      router.replace('/subcategories')
    }
  }
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onAddCategory}>
        Add Subcategory
      </button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Subcategory</th>
            <th>Category</th>
            <th align="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(subcategories ?? []).map((subcategory) => (
            <tr key={subcategory._id}>
              <td>
                <Link
                  href="/subcategories/[_id]"
                  as={`/subcategories/${subcategory._id}`}
                >
                  {subcategory.title}
                </Link>
                <br />
              </td>
              <td>{subcategory.category.slug}</td>
              <td align="right">
                <Icon.Trash
                  onClick={onDelete}
                  id={subcategory._id}
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

export { Subcategories }
