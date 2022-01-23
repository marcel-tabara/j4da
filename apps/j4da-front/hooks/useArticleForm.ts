import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { articleService, keywordService } from '../services'
import { IArticle, IKeyword } from '../utils/types'
import { useSelectors } from './useSelectors'

interface Props {
  article: IArticle
  onChangeApp: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSubmit: (data) => FormEventHandler<HTMLFormElement>
  setValue: (field: string, value: string) => void
}

export const useArticleForm = ({
  article,
  onChangeApp,
  onChangeCategory,
  handleSubmit,
  setValue,
}: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { keywords, keywordsByArticleId } = useSelectors()
  const [selectedKeywords, setSelectedKeywords] = useState<IKeyword[]>(
    keywordsByArticleId || []
  )

  console.log('########## selectedKeywords', selectedKeywords)
  useEffect(() => {
    Boolean(article?.app?._id) &&
      onChangeApp({
        target: { value: article?.app?._id },
      } as React.ChangeEvent<HTMLSelectElement>)
    Boolean(article?.category?._id) &&
      onChangeCategory({
        target: { value: article?.category?._id },
      } as React.ChangeEvent<HTMLSelectElement>)
  }, [article?.app?._id, article?.category?._id, onChangeApp, onChangeCategory])

  const extractKeywords = useCallback(
    (text: string) => {
      dispatch(
        keywordService.actions.extractKeywords({
          _id: article._id,
          text,
        })
      )
    },
    [article._id, dispatch]
  )

  useEffect(
    () => article?.body && extractKeywords(article?.body),
    [article?.body, extractKeywords]
  )

  const onSubmit = handleSubmit((data: IArticle) => {
    if (article?._id) {
      dispatch(
        articleService.actions.updateArticle({ ...data, _id: article?._id })
      )
      dispatch(keywordService.actions.deleteKeywordByArticleId(article._id))
    } else {
      dispatch(articleService.actions.createArticle(data))
    }
    dispatch(keywordService.actions.insertMany(selectedKeywords))

    router.replace('/articles')
  })
  const onBodyChange = useCallback(
    async (e) => {
      if (e) {
        setValue('body', e)
        extractKeywords(e)
      }
    },
    [extractKeywords, setValue]
  )
  const onAddKeyword = useCallback(
    (event) => {
      const find = keywords.find((e) => e.title === event.target.id)
      const newSelectedKeywords = [...selectedKeywords].concat(find)
      setSelectedKeywords(newSelectedKeywords)
      setValue('keywords', newSelectedKeywords.map((e) => e.title).join(','))
    },
    [keywords, selectedKeywords, setValue]
  )
  const onRemoveKeyword = useCallback(
    (event) => {
      const newSelectedKeywords = selectedKeywords.filter(
        (e) => e.title !== event.target.id
      )
      setSelectedKeywords(newSelectedKeywords)
      setValue('keywords', newSelectedKeywords.toString())
    },
    [selectedKeywords, setValue]
  )

  return {
    selectedKeywords,
    setSelectedKeywords,
    extractKeywords,
    onSubmit,
    onBodyChange,
    onAddKeyword,
    onRemoveKeyword,
    keywords,
  }
}
