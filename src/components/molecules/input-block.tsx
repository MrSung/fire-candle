import React from 'react'
import styled from 'styled-components'
import { InputSet } from '../atoms/input-set'

const inputBlockItems = [
  {
    id: 'openRate',
    labelText: '始値（open rate）'
  },
  {
    id: 'closeRate',
    labelText: '終値（close rate）'
  },
  {
    id: 'lowPrice',
    labelText: '安値（low price）'
  },
  {
    id: 'highPrice',
    labelText: '高値（high price）'
  }
]

export const InputBlock = () => {
  return (
    <Wrapper>
      {inputBlockItems.map(({ id, labelText }) => (
        <InputSet key={id} id={id} type='number' labelText={labelText} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
