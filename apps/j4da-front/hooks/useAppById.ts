import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appByIdSelectors, appByIdService } from '../services'
import { IApp } from '../utils/types'

export const useAppById = (
  _id: string
): {
  appById: IApp
  available: boolean
  fetching: boolean
} => {
  const dispatch = useDispatch()
  const { data, available, fetching } = useSelector(
    appByIdSelectors.appByIdSelector
  )

  useEffect(() => {
    !available && !fetching && dispatch(appByIdService.actions.getAppById(_id))
  }, [_id, available, dispatch, fetching])

  return {
    appById: data,
    available,
    fetching,
  }
}
