import React from 'react'
import styled from 'styled-components'
import * as inputId from '../../const/input-label'
import { InputSet } from '../atoms/input-set'

interface IInputBlockProps {
  playerName: string
  nthDayValue: number
  openRateValue: number
  closeRateValue: number
  lowPriceValue: number
  highPriceValue: number
}

export const InputBlock = (props: IInputBlockProps) => {
  return (
    <Wrapper>
      <InputSet
        inputId={inputId.PLAYER_NAME}
        type='text'
        value={props.playerName}
        placeholder='デモ太郎'
        labelText='プレイヤー：'
      />
      <InputSet
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
      />
      <InputSet
        inputId={inputId.CLOSE_RATE}
        type='number'
        value={props.closeRateValue}
        placeholder=''
        labelText='終値：'
      />
      <InputSet
        inputId={inputId.LOW_PRICE}
        type='number'
        value={props.lowPriceValue}
        placeholder=''
        labelText='安値：'
      />
      <InputSet
        inputId={inputId.HIGH_PRICE}
        type='number'
        value={props.highPriceValue}
        placeholder=''
        labelText='高値：'
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
