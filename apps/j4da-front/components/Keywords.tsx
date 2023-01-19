import Link from 'next/link'
import { useRouter } from 'next/router'
import * as Icon from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux'
import { keywordService } from '../services'
import { IKeywordsProps } from '../utils/types'

const Keywords = ({ keywords }: IKeywordsProps) => {
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
            <th>Article</th>
            <th>External link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(keywords ?? []).map((keyword) => (
            <tr key={keyword._id}>
              <td>
                <Link href="/keywords/[_id]" as={`/keywords/${keyword._id}`}>
                  {keyword.title}
                </Link>
              </td>
              <td>
                <Link
                  href="/articles/[_id]"
                  as={`/articles/${keyword.articleLink._id}`}
                >
                  {keyword.article._id}
                </Link>
              </td>
              <td>
                <Link
                  href="/articles/[_id]"
                  as={`/articles/${keyword.articleLink._id}`}
                >
                  {keyword.article._id !== keyword.articleLink._id &&
                    keyword.articleLink._id}
                </Link>
              </td>
              <td align="right">
                <Icon.Trash
                  onClick={onDelete}
                  id={keyword._id}
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

export { Keywords }
