import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const alert = (state: RootState) => state.alertService

export const alertSelector = createSelector(alert, (items) => items)
