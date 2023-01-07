import React from 'react'
import { useDispatch } from 'react-redux'
import { useApps } from '../hooks/useApps'
import { useKeywords } from '../hooks/useKeywords'
import { articleService } from '../services'
import { Main } from '../templates/Main'

const Index = () => {
  const dispatch = useDispatch()
  const appsData = useApps()
  useKeywords()

  const onGenerate = (event) => {
    event.preventDefault()
    dispatch(articleService.actions.generateContentByApp(event.target.id))
  }
  return (
    <Main>
      <ul>
        {(appsData?.apps ?? []).map((app) => (
          <li key={app._id} onClick={onGenerate}>
            <a href="" id={app._id}>
              Generate {app.slug}
            </a>
          </li>
        ))}
      </ul>
    </Main>
  )
}

export default Index
