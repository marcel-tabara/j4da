import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  articleByIdService,
  articleService,
  extractedKeywordsService,
  keywordService,
} from '../services'
import { useSelectors } from './useSelectors'

export const useArticleForm = ({
  article,
  onChangeApp,
  onChangeCategory,
  watch,
  handleSubmit,
  setValue,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { extractedKeywords } = useSelectors()
  const [bodyKeywords, setBodyKeywords] = useState([])
  const [defaultBodyKeywords, setDefaultBodyKeywords] = useState([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    !article?.keywords?.length ? [] : article?.keywords.split(',')
  )
  useEffect(() => {
    return () => {
      dispatch(articleByIdService.actions.reset())
    }
  }, [dispatch])

  useEffect(() => {
    article?.app &&
      onChangeApp({
        target: { value: article?.app },
      } as React.ChangeEvent<HTMLSelectElement>)
    article?.category &&
      onChangeCategory({
        target: { value: article?.category },
      } as React.ChangeEvent<HTMLSelectElement>)
  }, [article?.app, article?.category, onChangeApp, onChangeCategory])

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const extractKeywords = useCallback(
    (text: string) => {
      dispatch(extractedKeywordsService.actions.extractKeywords(text))
    },
    [dispatch]
  )

  useEffect(
    () => article?.body && extractKeywords(article?.body),
    [article?.body, extractKeywords]
  )
  useEffect(() => {
    setBodyKeywords(extractedKeywords)
  }, [extractedKeywords, setBodyKeywords])
  useEffect(() => {
    extractedKeywords &&
      !defaultBodyKeywords.length &&
      setDefaultBodyKeywords(extractedKeywords)
  }, [extractedKeywords, defaultBodyKeywords, setDefaultBodyKeywords])

  const onSubmit = handleSubmit((data) => {
    if (article?._id) {
      dispatch(
        articleService.actions.updateArticle({ ...data, _id: article?._id })
      )
    } else {
      dispatch(articleService.actions.createArticle(data))
    }

    const oldKeywords = article?.keywords.split(',') || []
    const newKeywords = data.keywords.split(',') || []
    console.log('########## oldKeywords', oldKeywords)
    console.log('########## newKeywords', newKeywords)
    const a = oldKeywords.filter((e) => !newKeywords.includes(e))
    const b = newKeywords.filter((e) => !oldKeywords.includes(e))
    console.log('########## a', a)
    console.log('########## b', b)
    if (a.length > 0) {
      dispatch(keywordService.actions.bulkremove(a))
    }

    if (b.length > 0) {
      dispatch(keywordService.actions.bulkupsert(b))
    }

    router.replace('/articles')
  })
  const onBodyChange = useCallback(
    async (e) => {
      extractKeywords(e.target.value)
    },
    [extractKeywords]
  )
  const onAddKeyword = useCallback(
    (event) => {
      const newSelectedKeywords = [...selectedKeywords].concat(event.target.id)
      setSelectedKeywords(newSelectedKeywords)
      setValue('keywords', newSelectedKeywords.toString())

      const newBodyKeywords = bodyKeywords.filter(
        (keyword) => keyword !== event.target.id
      )
      setBodyKeywords(newBodyKeywords)
    },
    [bodyKeywords, selectedKeywords, setValue]
  )
  const onRemoveKeyword = useCallback(
    (event) => {
      const newSelectedKeywords = selectedKeywords.filter(
        (e) => e !== event.target.id
      )
      setSelectedKeywords(newSelectedKeywords)
      setValue('keywords', newSelectedKeywords.toString())

      const newBodyKeywords = defaultBodyKeywords.filter(
        (keyword) => !newSelectedKeywords.includes(keyword)
      )
      setBodyKeywords(newBodyKeywords)
    },
    [defaultBodyKeywords, selectedKeywords, setValue]
  )
  const onChangeKeywords = useCallback((e) => {
    setSelectedKeywords(e.target.value.split(','))
  }, [])

  return {
    bodyKeywords,
    setBodyKeywords,
    defaultBodyKeywords,
    setDefaultBodyKeywords,
    selectedKeywords,
    setSelectedKeywords,
    extractKeywords,
    onSubmit,
    onBodyChange,
    onChangeKeywords,
    onAddKeyword,
    onRemoveKeyword,
  }
}
