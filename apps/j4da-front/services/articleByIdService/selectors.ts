import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const articleById = (state: RootState) => state.articleByIdService
export const articleByIdSelector = createSelector(articleById, (items) => items)
