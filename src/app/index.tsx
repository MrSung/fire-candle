import React, { useState } from 'react'
import styled from 'styled-components'

import { useFirebase } from './firebase'
import { initialChartValue } from './features/charts/charts-slice'
import { StartBlock } from '../components/molecules/start-block'
import { InputChartBlocks } from '../components/organisms/input-chart-blocks'

export const App = () => {
  const [isFirebaseDataExists, setIsFirebaseDataExists] = useState(false)
  const firebase = useFirebase()

  const handleStartButtonClick = async () => {
    if (firebase === null) return

    const charts = firebase.referDbByKeyName('charts')

    await charts.once('value', async snapshot => {
      const data = snapshot.val()

      if (data !== null) return

      await charts.push(initialChartValue)
    })

    setIsFirebaseDataExists(true)
  }

  return (
    <Wrapper>
      {(() => {
        if (firebase === null) return null

        if (!isFirebaseDataExists) {
          return <StartBlock onStartButtonClick={handleStartButtonClick} />
        }

        return <InputChartBlocks />
      })()}
    </Wrapper>
  )
}

const Wrapper = styled.div``
