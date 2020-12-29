import { combineReducers } from '@reduxjs/toolkit'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'

import { ICharts } from './features/charts/charts-slice'

export interface ISchema {
  charts: ICharts
}

export interface IRootState {
  firebase: FirebaseReducer.Reducer<Record<string, never>, ISchema>
}

export const rootReducer = combineReducers<IRootState>({
  firebase: firebaseReducer
})
