import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useSelectors } from '../hooks/useSelectors'

const AlertWrapper = () => {
  const [show, setShow] = useState(false)
  const { alert } = useSelectors()
  const onClose = () => setShow(false)

  useEffect(() => {
    setShow(!alert ? false : true)
  }, [alert])

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={onClose} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{alert}</p>
        </Alert>
      )}
    </>
  )
}

export { AlertWrapper }
