import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const apps = (state: RootState) => state.appService

export const appsSelector = createSelector(apps, (items) => items)
