import {
  configureStore,
  getDefaultMiddleware,
  PreloadedState
} from '@reduxjs/toolkit'
import {
  getFirebase,
  actionTypes as rrfActionTypes
} from 'react-redux-firebase'
import logger from 'redux-logger'

import { rootReducer, IRootState } from './reducer'

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

const configureAppStore = (preloadedState?: PreloadedState<IRootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production'
  })

  return store
}

export const store = configureAppStore()
