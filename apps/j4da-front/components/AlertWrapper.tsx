import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useSelectors } from '../hooks/useSelectors'

const AlertWrapper = () => {
  const [show, setShow] = useState(false)
  const { alerts } = useSelectors()
  const onClose = () => setShow(false)

  useEffect(() => {
    setShow(!alerts.length ? false : true)
  }, [alerts.length])

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={onClose} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>alerts[0]</p>
        </Alert>
      )}
    </>
  )
}

export { AlertWrapper }
