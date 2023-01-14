import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { appByIdService } from '../services'
import { IApp } from '../utils/types'
import { useSelectors } from './useSelectors'

export const useAppById = (
  _id: string
): {
  appById: IApp
  appByIdAvailable: boolean
  appByIdFetching: boolean
} => {
  const dispatch = useDispatch()
  const { appById, appByIdAvailable, appByIdFetching } = useSelectors()

  useEffect(() => {
    _id &&
      !appByIdAvailable &&
      !appByIdFetching &&
      dispatch(appByIdService.actions.getAppById(_id))
  }, [_id, appByIdAvailable, dispatch, appByIdFetching])

  return {
    appById,
    appByIdAvailable,
    appByIdFetching,
  }
}
