import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appByIdSelectors, appByIdService } from '../services'
import { StatusType } from '../services/utils/genericSlice'
import { IApp } from '../utils/types'

export const useAppById = (
  _id: string
): {
  appById: IApp
  status: StatusType
} => {
  const dispatch = useDispatch()
  const { data, status } = useSelector(appByIdSelectors.appByIdSelector)

  useEffect(() => {
    !status && dispatch(appByIdService.actions.getAppById(_id))
  }, [_id, dispatch, status])

  return {
    appById: data,
    status,
  }
}
