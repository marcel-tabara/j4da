import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { appService } from '../services'
import { IApp } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useApps = (): {
  apps: IApp[]
  appsAvailable: boolean
  appsFetching: boolean
} => {
  const dispatch = useDispatch()
  const { apps, appsAvailable, appsFetching } = useSelectors({})

  useEffect(() => {
    !appsAvailable && !appsFetching && dispatch(appService.actions.getApps())
  }, [appsAvailable, dispatch, appsFetching])

  return {
    apps: apps,
    appsAvailable: appsAvailable,
    appsFetching: appsFetching,
  }
}
