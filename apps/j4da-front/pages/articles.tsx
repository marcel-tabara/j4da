import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Articles } from '../components/Articles'
import { articleSelectors, articleService } from '../services'
import { Main } from '../templates/Main'

const ArticlesList = () => {
  const dispatch = useDispatch()
  const articles = useSelector(articleSelectors.articlesSelector)
  const pagination = {}

  useEffect(() => {
    dispatch(articleService.actions.getArticles())
  }, [dispatch])
  return (
    <Main>
      {!articles?.data ? (
        <Spinner animation="grow" />
      ) : (
        <Articles articles={articles?.data ?? []} pagination={pagination} />
      )}
    </Main>
  )
}

export default ArticlesList
