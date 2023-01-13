import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'

const SimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

const MDEWrapper = ({ value, onChange, onBlur }) => {
  return (
    <div>
      <SimpleMdeEditor value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  )
}

export { MDEWrapper }
