import React from 'react'
import styled from 'styled-components'
import { Input, InputLabel } from '@material-ui/core'

interface IInputSetProps {
  id: string
  type: string
  value: number
  labelText: string
}

export const InputSet = ({ id, type, value, labelText }: IInputSetProps) => {
  return (
    <Wrapper>
      <StyledInputLabel>
        <LabelText>{labelText}</LabelText>
        <Input id={id} type={type} value={value} />
      </StyledInputLabel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:nth-of-type(n + 3) {
    margin-top: 2rem;
  }
`

const StyledInputLabel = styled(InputLabel)`
  width: 160px;
`

const LabelText = styled.span`
  display: inline-block;
  margin-right: 0.5em;
`
