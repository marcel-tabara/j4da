import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appSelectors, appService } from '../services'
import { IApp } from '../utils/types'

export const useApps = (): {
  apps: IApp[]
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { available, fetching, data } = useSelector(appSelectors.appsSelector)

  useEffect(() => {
    !available && !fetching && dispatch(appService.actions.getApps())
  }, [available, dispatch, fetching])

  return {
    apps: data,
    available,
    fetching,
  }
}
