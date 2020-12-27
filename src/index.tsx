import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import './index.css'
import { Firebase, FirebaseContext } from './app/firebase'
import { store } from './app/store'
import { App } from './app'
import reportWebVitals from './reportWebVitals'

const { Provider: FirebaseCtxProvider } = FirebaseContext

ReactDOM.render(
  <FirebaseCtxProvider value={new Firebase()}>
    <ReduxProvider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReduxProvider>
  </FirebaseCtxProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
