import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux'
import { categoryService } from '../services'
import { ICategoriesProps } from '../utils/types'

const Categories = ({ categories }: ICategoriesProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const onAddCategory = () => router.replace('/categories/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      dispatch(categoryService.actions.deleteCategory(e.target.id))
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
          {(categories ?? []).map((category) => (
            <tr key={category._id}>
              <td>
                <Link
                  href="/categories/[_id]"
                  as={`/categories/${category._id}`}
                >
                  {category.title}
                </Link>
                <br />
                {(category?.subcategories ?? []).map(
                  (subcat) => subcat.title + ' | '
                )}
              </td>
              <td align="right">
                <Icon.Trash
                  onClick={onDelete}
                  id={category._id}
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

export { Categories }
