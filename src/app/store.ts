import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  getFirebase,
  actionTypes as rrfActionTypes
} from 'react-redux-firebase'
import logger from 'redux-logger'

import { rootReducer } from './reducer'

const extraArgument = {
  getFirebase
}

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // ignore every redux-firebase action type
        ...Object.keys(rrfActionTypes).map(
          type => `@@reactReduxFirebase/${type}`
        )
      ],
      ignoredPaths: ['firebase']
    },
    thunk: {
      extraArgument
    }
  }),
  logger
]

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production'
})
