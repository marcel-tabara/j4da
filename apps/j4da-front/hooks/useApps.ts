import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appSelectors, appService } from '../services'
import { IApp } from '../utils/types'

export const useApps = (): {
  apps: IApp[]
  appsAvailable: boolean
  appsFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    available: appsAvailable,
    fetching: appsFetching,
    data: apps,
  } = useSelector(appSelectors.appsSelector)

  useEffect(() => {
    !appsAvailable && !appsFetching && dispatch(appService.actions.getApps())
  }, [appsAvailable, dispatch, appsFetching])

  return {
    apps,
    appsAvailable,
    appsFetching,
  }
}
