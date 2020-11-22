import React, { useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../app/reducer'
import { chartsSlice } from '../../features/charts/charts-slice'
import {
  IChartValue,
  initialChartValue
} from '../../features/charts/charts-slice'
import { Button } from '@material-ui/core'
import { InputSet } from '../atoms/input-set'
import { InputSwitcher } from '../atoms/input-switcher'

enum InputId {
  PlayerName = 'playerName',
  NthDay = 'nthDay',
  OpenRate = 'openRate',
  CloseRate = 'closeRate',
  LowPrice = 'lowPrice',
  HighPrice = 'highPrice'
}

type InputBlockType =
  | 'playerName'
  | 'nthDay'
  | 'openRate'
  | 'closeRate'
  | 'lowPrice'
  | 'highPrice'

type InputBlockReducerType = (
  state: IChartValue,
  action: { type: InputBlockType; payload: string }
) => IChartValue

const inputBlockReducer: InputBlockReducerType = (state, action) => {
  switch (action.type) {
    case 'playerName':
      return { ...state, playerName: action.payload }
    case 'nthDay':
      return { ...state, nthDay: action.payload }
    case 'openRate':
      return { ...state, openRate: action.payload }
    case 'closeRate':
      return { ...state, closeRate: action.payload }
    case 'lowPrice':
      return { ...state, lowPrice: action.payload }
    case 'highPrice':
      return { ...state, highPrice: action.payload }
    default:
      return state
  }
}

interface IInputBlockProps {
  id: string
  playerName: string
  nthDay: string
  openRate: string
  closeRate: string
  lowPrice: string
  highPrice: string
}

export const InputBlock = (props: IInputBlockProps) => {
  const charts = useSelector((state: RootState) => state.charts)
  const currentCharts = charts[props.id]
  const currentChartsCount = currentCharts.length
  const currentChart = currentCharts.find(chartValue => chartValue.isSelected)
  const isCurrentChartNotFilled =
    typeof currentChart !== 'undefined'
      ? Object.values(currentChart).some(val => val === '')
      : false

  const dispatch = useDispatch()
  const { setChart, decrementNthDay, incrementNthDay } = chartsSlice.actions

  const [localState, localDispatch] = useReducer(inputBlockReducer, {
    ...initialChartValue,
    ...props
  })
  const localStateNotFilled = Object.values(localState).some(val => val === '')

  const vacateFigures = () => {
    localDispatch({
      type: InputId.OpenRate,
      payload: ''
    })
    localDispatch({
      type: InputId.CloseRate,
      payload: ''
    })
    localDispatch({
      type: InputId.LowPrice,
      payload: ''
    })
    localDispatch({
      type: InputId.HighPrice,
      payload: ''
    })
  }

  return (
    <Wrapper>
      <InputSet
        inputId={InputId.PlayerName}
        type='text'
        value={localState.playerName}
        placeholder='デモ太郎'
        labelText='プレイヤー：'
        onChange={ev => {
          localDispatch({ type: InputId.PlayerName, payload: ev.target.value })
        }}
      />
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
          vacateFigures()
        }}
        isLeftButtonDisabled={Number(localState.nthDay) <= 1}
        onRightButtonClick={() => {
          localDispatch({
            type: InputId.NthDay,
            payload: String(Number(localState.nthDay) + 1)
          })
          dispatch(incrementNthDay({ currentId: props.id }))
          vacateFigures()
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
          onClick={() => {
            dispatch(setChart({ currentChart: localState }))
          }}
          disabled={localStateNotFilled}
        >
          反映する
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  margin-top: 2rem;
`
