import React from 'react'
// import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// import { chartsSlice } from '../../features/charts/charts-slice'
import { InputSet } from '../atoms/input-set'
import { InputSwitcher } from '../atoms/input-switcher'

enum inputId {
  PLAYER_NAME = 'playerName',
  NTH_DAY = 'nthDay',
  OPEN_RATE = 'openRate',
  CLOSE_RATE = 'closeRate',
  LOW_PRICE = 'lowPrice',
  HIGH_PRICE = 'highPrice'
}

interface IInputBlockProps {
  chartId: string
  playerName: string
  nthDayValue: string
  openRateValue: string
  closeRateValue: string
  lowPriceValue: string
  highPriceValue: string
}

export const InputBlock = (props: IInputBlockProps) => {
  // const dispatch = useDispatch()
  // const {
  //   editPlayerName,
  //   editNthDay,
  //   editOpenRate,
  //   editCloseRate,
  //   editLowPrice,
  //   editHighPrice
  // } = chartsSlice.actions

  return (
    <Wrapper>
      <InputSet
        inputId={inputId.PLAYER_NAME}
        type='text'
        value={props.playerName}
        placeholder='デモ太郎'
        labelText='プレイヤー：'
        onChange={_ => {
          // dispatch(
          //   editPlayerName({ id: props.chartId, playerName: ev.target.value })
          // )
        }}
      />
      <InputSwitcher
        inputId={inputId.NTH_DAY}
        type='number'
        value={props.nthDayValue}
        placeholder=''
        labelText='何日目：'
      />
      <InputSet
        inputId={inputId.OPEN_RATE}
        type='number'
        value={props.openRateValue}
        placeholder=''
        labelText='始値：'
        onChange={_ => {
          // dispatch(
          //   editOpenRate({
          //     id: props.chartId,
          //     openRate: ev.target.value
          //   })
          // )
        }}
      />
      <InputSet
        inputId={inputId.CLOSE_RATE}
        type='number'
        value={props.closeRateValue}
        placeholder=''
        labelText='終値：'
        onChange={_ => {
          // dispatch(
          //   editCloseRate({
          //     id: props.chartId,
          //     closeRate: ev.target.value
          //   })
          // )
        }}
      />
      <InputSet
        inputId={inputId.LOW_PRICE}
        type='number'
        value={props.lowPriceValue}
        placeholder=''
        labelText='安値：'
        onChange={_ => {
          // dispatch(
          //   editLowPrice({
          //     id: props.chartId,
          //     lowPrice: ev.target.value
          //   })
          // )
        }}
      />
      <InputSet
        inputId={inputId.HIGH_PRICE}
        type='number'
        value={props.highPriceValue}
        placeholder=''
        labelText='高値：'
        onChange={_ => {
          // dispatch(
          //   editHighPrice({
          //     id: props.chartId,
          //     highPrice: ev.target.value
          //   })
          // )
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
