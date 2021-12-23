import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const alerts = (state: RootState) => state.alertService

export const alertsSelector = createSelector(alerts, (items) => items)
