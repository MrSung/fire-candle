import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../app/reducer'
import {
  chartsSlice,
  chartsInitialState
} from '../../features/charts/charts-slice'
import { InputBlock } from '../molecules/input-block'
import { AddBlockButton } from '../atoms/add-block-button'

export const InputBlocks = () => {
  const charts = useSelector((state: RootState) => state.charts)
  const dispatch = useDispatch()
  const { addNewInput } = chartsSlice.actions

  return (
    <Wrapper>
      {charts.map(chart => (
        <InputBlockWrap key={chart.id}>
          <InputBlock
            nthDayValue={chart.nthDay}
            openRateValue={chart.openRate}
            closeRateValue={chart.closeRate}
            lowPriceValue={chart.lowPrice}
            highPriceValue={chart.highPrice}
          />
        </InputBlockWrap>
      ))}
      <AddBlockButton
        onClick={() => {
          dispatch(
            addNewInput({
              ...chartsInitialState[0],
              id: nanoid()
            })
          )
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const InputBlockWrap = styled.div`
  padding: 28px 28px 32px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);

  & + & {
    margin-top: 32px;
  }
`
