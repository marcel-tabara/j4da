import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { articleService, keywordExtractionService } from '../services'
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

  const { extractedKeywords, keywordsByArticleId } = useSelectors()
  const [selectedKeywords, setSelectedKeywords] =
    useState<IKeyword[]>(keywordsByArticleId)

  useEffect(() => {
    setSelectedKeywords(keywordsByArticleId || [])
  }, [keywordsByArticleId])

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
        keywordExtractionService.actions.extractKeywords({
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

  useEffect(() => {
    return () => {
      dispatch(keywordExtractionService.actions.reset())
    }
  }, [dispatch])

  const onSubmit = handleSubmit((data: IArticle) => {
    article?._id
      ? dispatch(
          articleService.actions.updateArticle({
            ...data,
            _id: article?._id,
            keywords: selectedKeywords,
          })
        )
      : dispatch(
          articleService.actions.createArticle({
            ...data,
            keywords: selectedKeywords,
          })
        )

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
      const find = extractedKeywords.find((e) => e.title === event.target.id)
      const newSelectedKeywords = [...selectedKeywords].concat(find)
      setSelectedKeywords(newSelectedKeywords)
    },
    [extractedKeywords, selectedKeywords]
  )
  const onRemoveKeyword = useCallback(
    (event) => {
      const newSelectedKeywords = selectedKeywords.filter(
        (e) => e.title !== event.target.id
      )
      setSelectedKeywords(newSelectedKeywords)
    },
    [selectedKeywords]
  )

  return {
    selectedKeywords,
    setSelectedKeywords,
    extractKeywords,
    onSubmit,
    onBodyChange,
    onAddKeyword,
    onRemoveKeyword,
    extractedKeywords,
  }
}
