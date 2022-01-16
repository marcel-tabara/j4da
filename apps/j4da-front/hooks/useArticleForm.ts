import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  articleService,
  articlesKeywordsService,
  extractedKeywordsService,
  keywordService,
} from '../services'
import { IArticle, IArticlesKeyword } from '../utils/types'
import { useArticlesKeywords } from './useArticlesKeywords'
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

  const { articlesKeywords } = useSelectors()
  const { extractedKeywords } = useSelectors()
  const [bodyKeywords, setBodyKeywords] = useState<string[]>([])
  const [defaultBodyKeywords, setDefaultBodyKeywords] = useState<string[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    !article?.keywords?.length ? [] : article?.keywords.split(',')
  )

  const [articleLinks, setArticleLinks] = useState<IArticlesKeyword[]>([])
  const [selectedLinks, setSelectedLinks] = useState<IArticlesKeyword[]>(
    !article?.links?.length ? [] : article?.links
  )

  useArticlesKeywords({ keywords: bodyKeywords, _id: article._id })

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

  const onSubmit = handleSubmit((data: IArticle) => {
    if (article?._id) {
      dispatch(
        articleService.actions.updateArticle({ ...data, _id: article?._id })
      )
    } else {
      dispatch(articleService.actions.createArticle(data))
    }

    const oldKeywords = (article?.keywords ?? '').split(',') || []
    const newKeywords = data.keywords.split(',') || []
    const a = oldKeywords.filter((e: string) => !newKeywords.includes(e))
    const b = newKeywords.filter((e: string) => !oldKeywords.includes(e))
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
      if (e) {
        setValue('body', e)
        extractKeywords(e)
        dispatch(articlesKeywordsService.actions.reset())
      }
    },
    [dispatch, extractKeywords, setValue]
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
  const onAddLink = useCallback(
    (event) => {
      const id = event.target.id.split('_')
      const link = articlesKeywords.find(
        (e) => e.keyword === id[0] && e._id === id[1]
      )
      const newSelectedLinks = link && [...selectedLinks].concat(link)
      setSelectedLinks(newSelectedLinks)
      setValue('links', newSelectedLinks.toString())

      const newArticlesLinks = articleLinks.filter(
        (link) => link !== event.target.id
      )
      setArticleLinks(newArticlesLinks)
    },
    [articleLinks, articlesKeywords, selectedLinks, setValue]
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
  const onChangeKeywords = useCallback(
    (e) => {
      setSelectedKeywords(e.target.value.split(','))
      dispatch(articlesKeywordsService.actions.reset())
    },
    [dispatch]
  )
  const selectedArticlesKeywords = () =>
    (articlesKeywords || []).filter((e) => selectedKeywords.includes(e.keyword))

  return {
    bodyKeywords,
    setBodyKeywords,
    defaultBodyKeywords,
    setDefaultBodyKeywords,
    selectedKeywords,
    selectedArticlesKeywords,
    setSelectedKeywords,
    extractKeywords,
    onSubmit,
    onBodyChange,
    onChangeKeywords,
    onAddKeyword,
    onAddLink,
    onRemoveKeyword,
    articleLinks,
    selectedLinks,
  }
}
