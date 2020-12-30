// This import loads the firebase namespace along with all its type information.
import app from 'firebase/app'
// These imports load individual services into the firebase namespace.
import 'firebase/database'

export { FirebaseContext, useFirebase } from './context'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

export class Firebase {
  db: app.database.Database

  constructor() {
    app.initializeApp(firebaseConfig)

    this.db = app.database()
  }

  referDbByKeyName = (keyName: string) => this.db.ref(keyName)
}
