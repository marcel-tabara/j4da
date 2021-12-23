import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux'
import { keywordService } from '../services'
import { IKeywordsProps } from '../utils/types'

const Keywords = (props: IKeywordsProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const onAddKeyword = () => router.replace('/keywords/add')
  const onDelete = async (e) => {
    if (e.target.id) {
      dispatch(keywordService.actions.deleteKeyword(e.target.id))
      router.replace('/keywords')
    }
  }
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
          {(props?.keywords ?? []).map((keyword) => (
            <tr key={keyword._id}>
              <td>
                <Link href="/keywords/[_id]" as={`/keywords/${keyword._id}`}>
                  {keyword.title}
                </Link>
              </td>
              <td>
                <Icon.Trash onClick={onDelete} id={keyword._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export { Keywords }
