import firebase from 'firebase/app'
import 'firebase/database'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import './index.css'
import { store } from './app/store'
import { App } from './app'
import reportWebVitals from './reportWebVitals'

const fbConfig = {}

const rrfConfig = {
  // userProfile: 'users'
}

firebase.initializeApp(fbConfig)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
