import { createSelector } from '@reduxjs/toolkit'

const alerts = (state: { alertService: { alerts: string[] } }) =>
  state.alertService.alerts

export const alertsSelector = createSelector(alerts, (items) => items)
