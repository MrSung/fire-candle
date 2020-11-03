import React from 'react'
import styled from 'styled-components'
import { InputSet } from '../atoms/input-set'

const PLAYER_NAME = 'playerName'
const NTH_DAY = 'nthDay'
const OPEN_RATE = 'openRate'
const CLOSE_RATE = 'closeRate'
const LOW_PRICE = 'lowPrice'
const HIGH_PRICE = 'highPrice'

const inputBlockItems = [
  {
    id: PLAYER_NAME,
    labelText: 'プレイヤー：'
  },
  {
    id: NTH_DAY,
    labelText: '何日目：'
  },
  {
    id: OPEN_RATE,
    labelText: '始値：'
  },
  {
    id: CLOSE_RATE,
    labelText: '終値：'
  },
  {
    id: LOW_PRICE,
    labelText: '安値：'
  },
  {
    id: HIGH_PRICE,
    labelText: '高値：'
  }
]

interface IInputBlockProps {
  playerName: string
  nthDayValue: number
  openRateValue: number
  closeRateValue: number
  lowPriceValue: number
  highPriceValue: number
}

const getInputValue = (id: string, props: IInputBlockProps) => {
  switch (id) {
    case PLAYER_NAME:
      return {
        type: 'text',
        value: props.playerName,
        placeholder: 'デモ太郎'
      }
    case NTH_DAY:
      return { type: 'number', value: props.nthDayValue, placeholder: '' }
    case OPEN_RATE:
      return { type: 'number', value: props.openRateValue, placeholder: '' }
    case CLOSE_RATE:
      return { type: 'number', value: props.closeRateValue, placeholder: '' }
    case LOW_PRICE:
      return { type: 'number', value: props.lowPriceValue, placeholder: '' }
    case HIGH_PRICE:
      return { type: 'number', value: props.highPriceValue, placeholder: '' }
    default:
      return { type: 'text', value: '', placeholder: '' }
  }
}

export const InputBlock = (props: IInputBlockProps) => {
  return (
    <Wrapper>
      {inputBlockItems.map(({ id, labelText }) => {
        const { type, value, placeholder } = getInputValue(id, props)
        return (
          <InputSet
            key={id}
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            labelText={labelText}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
