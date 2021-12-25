import 'easymde/dist/easymde.min.css'
import React from 'react'
import SimpleMdeReact from 'react-simplemde-editor'

const MDEWrapper = ({ value, onChange }) => {
  return (
    <div>
      <SimpleMdeReact value={value} onChange={onChange} />
    </div>
  )
}

export { MDEWrapper }
