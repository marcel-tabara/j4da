import React from 'react'
import { useDispatch } from 'react-redux'
import { articleService } from '../services'
import { Main } from '../templates/Main'
import { IArticlesProps } from '../utils/types'

const Index = (props: IArticlesProps) => {
  const dispatch = useDispatch()
  const onGenerate = () => {
    dispatch(articleService.actions.generateArticles())
  }
  return (
    <Main>
      <button type="button" className="btn btn-primary" onClick={onGenerate}>
        Generate all article files
      </button>
    </Main>
  )
}

export default Index
