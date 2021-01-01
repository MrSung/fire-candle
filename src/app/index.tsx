import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { useFirebase } from './firebase'
import { chartsSlice, initialChartValue } from './features/charts/charts-slice'
import { StartBlock } from '../components/molecules/start-block'
import { InputChartBlocks } from '../components/organisms/input-chart-blocks'
import { formatChartsWithObjId } from '../utils/firebase-helper'

export const App = () => {
  const [isFirebaseDataExists, setIsFirebaseDataExists] = useState(false)
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const { setCharts } = chartsSlice.actions

  const handleStartButtonClick = async () => {
    if (firebase === null) return

    const charts = firebase.referDbByKeyName('charts')

    await charts.once('value', async snapshot => {
      const data = snapshot.val()
      const currentCharts = formatChartsWithObjId(data)
      const currentId = currentCharts[0].id

      dispatch(setCharts({ currentId, currentCharts }))

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
