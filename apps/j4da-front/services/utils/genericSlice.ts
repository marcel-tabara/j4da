import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'

export interface GenericState<T> {
  data?: T
  available: boolean
  fetching: boolean
}

export const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = '',
  initialState,
  reducers,
}: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      reset(state) {
        state.data = undefined
        state.available = false
        state.fetching = false
      },
      start(state) {
        state.fetching = true
      },
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload
        state.available = true
        state.fetching = false
      },
      ...reducers,
    },
  })
}
