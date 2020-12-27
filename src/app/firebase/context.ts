import React, { useContext } from 'react'

import { Firebase } from './'

export const FirebaseContext = React.createContext<InstanceType<
  typeof Firebase
> | null>(null)

export const useFirebase = () => useContext(FirebaseContext)
