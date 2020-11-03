import React from 'react'
import styled from 'styled-components'
import * as inputLabel from '../../const/input-label'
import { InputSet } from '../atoms/input-set'

const inputBlockItems = [
  {
    inputId: inputLabel.PLAYER_NAME,
    labelText: 'プレイヤー：'
  },
  {
    inputId: inputLabel.NTH_DAY,
    labelText: '何日目：'
  },
  {
    inputId: inputLabel.OPEN_RATE,
    labelText: '始値：'
  },
  {
    inputId: inputLabel.CLOSE_RATE,
    labelText: '終値：'
  },
  {
    inputId: inputLabel.LOW_PRICE,
    labelText: '安値：'
  },
  {
    inputId: inputLabel.HIGH_PRICE,
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

const getInputValue = (inputId: string, props: IInputBlockProps) => {
  switch (inputId) {
    case inputLabel.PLAYER_NAME:
      return {
        type: 'text',
        value: props.playerName,
        placeholder: 'デモ太郎'
      }
    case inputLabel.NTH_DAY:
      return { type: 'number', value: props.nthDayValue, placeholder: '' }
    case inputLabel.OPEN_RATE:
      return { type: 'number', value: props.openRateValue, placeholder: '' }
    case inputLabel.CLOSE_RATE:
      return { type: 'number', value: props.closeRateValue, placeholder: '' }
    case inputLabel.LOW_PRICE:
      return { type: 'number', value: props.lowPriceValue, placeholder: '' }
    case inputLabel.HIGH_PRICE:
      return { type: 'number', value: props.highPriceValue, placeholder: '' }
    default:
      return { type: 'text', value: '', placeholder: '' }
  }
}

export const InputBlock = (props: IInputBlockProps) => {
  return (
    <Wrapper>
      {inputBlockItems.map(({ inputId, labelText }) => {
        const { type, value, placeholder } = getInputValue(inputId, props)
        return (
          <InputSet
            key={inputId}
            inputId={inputId}
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
