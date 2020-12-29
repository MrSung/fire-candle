import { combineReducers } from '@reduxjs/toolkit'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'

import { IChart } from './features/charts/charts-slice'

export interface ISchema {
  charts: IChart
}

export interface IRootState {
  firebase: FirebaseReducer.Reducer<Record<string, never>, ISchema>
}

export const rootReducer = combineReducers<IRootState>({
  firebase: firebaseReducer
})
