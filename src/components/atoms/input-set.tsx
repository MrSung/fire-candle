import React from 'react'
import styled from 'styled-components'
import { Input, InputLabel } from '@material-ui/core'

interface IInputSetProps {
  id: string
  type: string
  value: string | number
  placeholder: string
  labelText: string
}

export const InputSet = ({
  id,
  type,
  value,
  placeholder,
  labelText
}: IInputSetProps) => {
  return (
    <Wrapper>
      <InputLabel
        style={{
          width: '120px'
        }}
      >
        <LabelText>{labelText}</LabelText>
        <Input id={id} type={type} value={value} placeholder={placeholder} />
      </InputLabel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:nth-of-type(n + 3) {
    margin-top: 2rem;
  }
`

const LabelText = styled.span`
  display: inline-block;
  margin-right: 0.5em;
`
