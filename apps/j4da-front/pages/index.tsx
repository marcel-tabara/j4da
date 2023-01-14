import { useDispatch } from 'react-redux'
import { useSelectors } from '../hooks/useSelectors'
import { articleService } from '../services'
import { Main } from '../templates/Main'

const Index = () => {
  const dispatch = useDispatch()
  const { apps } = useSelectors()

  const onGenerate = (event) => {
    event.preventDefault()
    dispatch(articleService.actions.generateContentByApp(event.target.id))
  }
  return (
    <Main>
      <ul>
        {(apps ?? []).map((app) => (
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
