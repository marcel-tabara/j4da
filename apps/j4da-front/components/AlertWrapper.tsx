import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { alertSelectors } from '../services'

const AlertWrapper = () => {
  const [show, setShow] = useState(false)
  const alerts = useSelector(alertSelectors.alertsSelector)
  useEffect(() => {
    setShow(!alerts.length ? false : true)
  }, [alerts])
  const onClose = () => setShow(false)
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
