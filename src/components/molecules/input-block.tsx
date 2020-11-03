import React from 'react'
import styled from 'styled-components'
import { InputSet } from '../atoms/input-set'

const NTH_DAY = 'nthDay'
const OPEN_RATE = 'openRate'
const CLOSE_RATE = 'closeRate'
const LOW_PRICE = 'lowPrice'
const HIGH_PRICE = 'highPrice'

const inputBlockItems = [
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
  nthDayValue: number
  openRateValue: number
  closeRateValue: number
  lowPriceValue: number
  highPriceValue: number
}

export const InputBlock = ({
  nthDayValue,
  openRateValue,
  closeRateValue,
  lowPriceValue,
  highPriceValue
}: IInputBlockProps) => {
  return (
    <Wrapper>
      {inputBlockItems.map(({ id, labelText }) => {
        let value = 0
        switch (id) {
          case NTH_DAY:
            value = nthDayValue
            break
          case OPEN_RATE:
            value = openRateValue
            break
          case CLOSE_RATE:
            value = closeRateValue
            break
          case LOW_PRICE:
            value = lowPriceValue
            break
          case HIGH_PRICE:
            value = highPriceValue
            break
        }
        return (
          <InputSet
            key={id}
            id={id}
            type='number'
            value={value}
            labelText={labelText}
            block={id === NTH_DAY}
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
