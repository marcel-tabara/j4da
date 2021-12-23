import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Articles } from '../components/Articles'
import { useArticles } from '../hooks/useArticles'
import { Main } from '../templates/Main'

const ArticlesList = () => {
  const pagination = {}
  const { articles, available } = useArticles()

  return (
    <Main>
      {!available ? (
        <Spinner animation="grow" />
      ) : (
        <Articles articles={articles?.data ?? []} pagination={pagination} />
      )}
    </Main>
  )
}

export default ArticlesList
