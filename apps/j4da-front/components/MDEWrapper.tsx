import 'easymde/dist/easymde.min.css'
import React from 'react'
import SimpleMdeReact from 'react-simplemde-editor'

const MDEWrapper = ({ value, onChange, onBlur }) => {
  return (
    <div>
      <SimpleMdeReact value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  )
}

export { MDEWrapper }
