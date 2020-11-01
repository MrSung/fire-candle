import { combineReducers } from '@reduxjs/toolkit'
import { chartsReducer } from '../features/charts/charts-slice'

export const rootReducer = combineReducers({
  charts: chartsReducer
})

export type RootState = ReturnType<typeof rootReducer>
