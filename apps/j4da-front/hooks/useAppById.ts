import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appByIdSelectors, appByIdService } from '../services'
import { IApp } from '../utils/types'

export const useAppById = (
  _id: string
): {
  appById: IApp
  appByIdAvailable: boolean
  appByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const {
    data: appById,
    available: appByIdAvailable,
    fetching: appByIdFetching,
  } = useSelector(appByIdSelectors.appByIdSelector)

  useEffect(() => {
    _id &&
      !appByIdAvailable &&
      !appByIdFetching &&
      dispatch(appByIdService.actions.getAppById(_id))
  }, [_id, appByIdAvailable, dispatch, appByIdFetching])
  useEffect(() => {
    return () => {
      dispatch(appByIdService.actions.reset())
    }
  }, [dispatch])

  return {
    appById,
    appByIdAvailable,
    appByIdFetching,
  }
}
