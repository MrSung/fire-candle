import React from 'react'
import styled from 'styled-components'
import { Input, InputLabel } from '@material-ui/core'

interface IInputSetProps {
  id: string
  type: string
  value: number
  labelText: string
  singleBlock: boolean
}

export const InputSet = ({
  id,
  type,
  value,
  labelText,
  singleBlock
}: IInputSetProps) => {
  return (
    <Wrapper>
      <StyledInputLabel singleBlock={singleBlock}>
        <LabelText>{labelText}</LabelText>
        <Input id={id} type={type} value={value} />
      </StyledInputLabel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:nth-of-type(n + 2) {
    margin-top: 2rem;
  }
`

interface IStyledInputLabel {
  singleBlock: boolean
}

const StyledInputLabel = styled(InputLabel)<IStyledInputLabel>`
  width: 160px;

  ${({ singleBlock }) =>
    singleBlock &&
    `
    width: 100%;
  `}
`

const LabelText = styled.span`
  display: inline-block;
  margin-right: 0.5em;
`
