import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appSelectors, appService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { IApp } from '../utils/types'

export const useApps = (): { apps: IApp[]; status: StatusType } => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(appSelectors.appsSelector)

  useEffect(() => {
    !status && dispatch(appService.actions.getApps())
  }, [dispatch, status])

  return {
    apps: data,
    status,
  }
}
