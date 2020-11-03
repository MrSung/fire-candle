import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { chartsSlice } from '../../features/charts/charts-slice'
import * as inputId from '../../const/input-label'
import { InputSet } from '../atoms/input-set'

interface IInputBlockProps {
  chartId: string
  playerName: string
  nthDayValue: number
  openRateValue: number
  closeRateValue: number
  lowPriceValue: number
  highPriceValue: number
}

export const InputBlock = (props: IInputBlockProps) => {
  const dispatch = useDispatch()
  const {
    editPlayerName,
    editNthDay,
    editOpenRate,
    editCloseRate,
    editLowPrice,
    editHighPrice
  } = chartsSlice.actions

  return (
    <Wrapper>
      <InputSet
        inputId={inputId.PLAYER_NAME}
        type='text'
        value={props.playerName}
        placeholder='デモ太郎'
        labelText='プレイヤー：'
        onChange={ev => {
          dispatch(
            editPlayerName({ id: props.chartId, playerName: ev.target.value })
          )
        }}
      />
      <InputSet
        inputId={inputId.NTH_DAY}
        type='number'
        value={props.nthDayValue}
        placeholder=''
        labelText='何日目：'
        onChange={ev => {
          dispatch(
            editNthDay({ id: props.chartId, nthDay: Number(ev.target.value) })
          )
        }}
      />
      <InputSet
        inputId={inputId.OPEN_RATE}
        type='number'
        value={props.openRateValue}
        placeholder=''
        labelText='始値：'
        onChange={ev => {
          dispatch(
            editOpenRate({
              id: props.chartId,
              openRate: Number(ev.target.value)
            })
          )
        }}
      />
      <InputSet
        inputId={inputId.CLOSE_RATE}
        type='number'
        value={props.closeRateValue}
        placeholder=''
        labelText='終値：'
        onChange={ev => {
          dispatch(
            editCloseRate({
              id: props.chartId,
              closeRate: Number(ev.target.value)
            })
          )
        }}
      />
      <InputSet
        inputId={inputId.LOW_PRICE}
        type='number'
        value={props.lowPriceValue}
        placeholder=''
        labelText='安値：'
        onChange={ev => {
          dispatch(
            editLowPrice({
              id: props.chartId,
              lowPrice: Number(ev.target.value)
            })
          )
        }}
      />
      <InputSet
        inputId={inputId.HIGH_PRICE}
        type='number'
        value={props.highPriceValue}
        placeholder=''
        labelText='高値：'
        onChange={ev => {
          dispatch(
            editHighPrice({
              id: props.chartId,
              highPrice: Number(ev.target.value)
            })
          )
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
