import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const keywordById = (state: RootState) => state.keywordByIdService
export const keywordByIdSelector = createSelector(keywordById, (items) => items)
