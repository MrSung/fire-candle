import React from 'react'
import styled from 'styled-components'
import { Input, InputLabel } from '@material-ui/core'

interface IInputSetProps {
  id: string
  type: string
  value: number
  labelText: string
  block: boolean
}

export const InputSet = ({
  id,
  type,
  value,
  labelText,
  block
}: IInputSetProps) => {
  return (
    <Wrapper>
      <InputLabel
        style={{
          width: block ? '100%' : '160px'
        }}
      >
        <LabelText>{labelText}</LabelText>
        <Input id={id} type={type} value={value} />
      </InputLabel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:nth-of-type(n + 2) {
    margin-top: 2rem;
  }
`

const LabelText = styled.span`
  display: inline-block;
  margin-right: 0.5em;
`
