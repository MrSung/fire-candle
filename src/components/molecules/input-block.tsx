import React, { useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

import { useFirebase } from '../../app/firebase'
import { RootState } from '../../app/reducer'
import {
  chartsSlice,
  IChartValue,
  initialChartValue
} from '../../app/features/charts/charts-slice'
import { InputSet } from '../atoms/input-set'
import { InputSwitcher } from '../atoms/input-switcher'

enum InputId {
  NthDay = 'nthDay',
  OpenRate = 'openRate',
  CloseRate = 'closeRate',
  LowPrice = 'lowPrice',
  HighPrice = 'highPrice'
}

type InputBlockType =
  | InputId.NthDay
  | InputId.OpenRate
  | InputId.CloseRate
  | InputId.LowPrice
  | InputId.HighPrice

type InputBlockReducerType = (
  state: IChartValue,
  action: { type: InputBlockType; payload: string }
) => IChartValue

const inputBlockReducer: InputBlockReducerType = (state, action) => {
  switch (action.type) {
    case InputId.NthDay:
      return { ...state, nthDay: action.payload }
    case InputId.OpenRate:
      return { ...state, openRate: action.payload }
    case InputId.CloseRate:
      return { ...state, closeRate: action.payload }
    case InputId.LowPrice:
      return { ...state, lowPrice: action.payload }
    case InputId.HighPrice:
      return { ...state, highPrice: action.payload }
    default:
      return state
  }
}

type InputBlockProps = Omit<IChartValue, 'isSelected'>

export const InputBlock = (props: InputBlockProps) => {
  const charts = useSelector((state: RootState) => state.charts)
  const currentCharts = charts[props.id]
  const currentChartsCount = currentCharts.length
  const currentChart = currentCharts.find(chartValue => chartValue.isSelected)
  const isCurrentChartNotFilled =
    typeof currentChart !== 'undefined'
      ? Object.values(currentChart).some(val => val === '')
      : false

  const firebase = useFirebase()
  const dispatch = useDispatch()
  const { decrementNthDay, incrementNthDay } = chartsSlice.actions

  const [localState, localDispatch] = useReducer(inputBlockReducer, {
    ...initialChartValue,
    ...props
  })
  const localStateNotFilled = Object.values(localState).some(val => val === '')

  useEffect(() => {
    if (typeof currentChart === 'undefined') {
      return
    }
    localDispatch({
      type: InputId.OpenRate,
      payload: currentChart.openRate
    })
    localDispatch({
      type: InputId.CloseRate,
      payload: currentChart.closeRate
    })
    localDispatch({
      type: InputId.LowPrice,
      payload: currentChart.lowPrice
    })
    localDispatch({
      type: InputId.HighPrice,
      payload: currentChart.highPrice
    })
  }, [localState.nthDay, currentChart])

  return (
    <Wrapper autoComplete='off'>
      <InputSwitcher
        inputId={InputId.NthDay}
        type='number'
        value={localState.nthDay}
        placeholder=''
        labelText='何日目：'
        onLeftButtonClick={() => {
          localDispatch({
            type: InputId.NthDay,
            payload: String(Number(localState.nthDay) - 1)
          })
          dispatch(decrementNthDay({ currentId: props.id }))
        }}
        isLeftButtonDisabled={Number(localState.nthDay) <= 1}
        onRightButtonClick={() => {
          localDispatch({
            type: InputId.NthDay,
            payload: String(Number(localState.nthDay) + 1)
          })
          dispatch(incrementNthDay({ currentId: props.id }))
        }}
        isRightButtonDisabled={
          isCurrentChartNotFilled ||
          localState.nthDay === String(Number(currentChartsCount) + 1)
        }
      />
      <InputSet
        inputId={InputId.OpenRate}
        type='number'
        value={localState.openRate}
        placeholder=''
        labelText='始値：'
        onChange={ev => {
          localDispatch({ type: InputId.OpenRate, payload: ev.target.value })
        }}
      />
      <InputSet
        inputId={InputId.CloseRate}
        type='number'
        value={localState.closeRate}
        placeholder=''
        labelText='終値：'
        onChange={ev => {
          localDispatch({ type: InputId.CloseRate, payload: ev.target.value })
        }}
      />
      <InputSet
        inputId={InputId.LowPrice}
        type='number'
        value={localState.lowPrice}
        placeholder=''
        labelText='安値：'
        onChange={ev => {
          localDispatch({ type: InputId.LowPrice, payload: ev.target.value })
        }}
      />
      <InputSet
        inputId={InputId.HighPrice}
        type='number'
        value={localState.highPrice}
        placeholder=''
        labelText='高値：'
        onChange={ev => {
          localDispatch({ type: InputId.HighPrice, payload: ev.target.value })
        }}
      />
      <ButtonContainer>
        <Button
          variant='contained'
          color='primary'
          onClick={async () => {
            if (firebase === null) return

            const currentChartValue = firebase.referDbByKeyName(
              `charts/${localState.id}`
            )

            await currentChartValue.set(localState)
          }}
          disabled={localStateNotFilled}
          size='large'
        >
          反映する
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  margin-top: 2rem;
`
