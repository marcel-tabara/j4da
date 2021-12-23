import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const appById = (state: RootState) => state.appByIdService
export const appByIdSelector = createSelector(appById, (items) => items)
