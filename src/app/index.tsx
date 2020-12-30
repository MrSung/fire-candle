import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useFirebase } from './firebase'
// import { initialChartValue } from './features/charts/charts-slice'
import { InputChartBlocks } from '../components/organisms/input-chart-blocks'

export const App = () => {
  const firebase = useFirebase()

  useEffect(() => {
    if (firebase === null) return

    // void firebase.referDbByKeyName('charts').push(initialChartValue, () => {
    //   // eslint-disable-next-line no-console
    //   console.log('initialChartValue pushed!')
    // })

    // void firebase.referDbByKeyName('charts').once('value', snapshot => {
    //   const data = snapshot.val()
    //   // eslint-disable-next-line no-console
    //   console.log('data', data)
    // })
  }, [firebase])

  return <Wrapper>{firebase !== null && <InputChartBlocks />}</Wrapper>
}

const Wrapper = styled.div``
