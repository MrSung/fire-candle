import React from 'react'
import styled from 'styled-components'
import { Input, InputLabel, Button } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

interface IInputSwitcherProps {
  inputId: string
  type: string
  value: string
  placeholder: string
  labelText: string
  onRightButtonClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

export const InputSwitcher = ({
  inputId,
  type,
  value,
  placeholder,
  labelText,
  onRightButtonClick
}: IInputSwitcherProps) => (
  <Wrapper>
    <InputLabel
      style={{
        width: '120px'
      }}
    >
      <LabelText>{labelText}</LabelText>
      <ButtonContainer>
        <Button style={{ width: '36px', minWidth: '36px' }}>
          <ArrowLeftIcon />
        </Button>
        <Input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly
          style={{ width: '40px' }}
        />
        <Button
          onClick={onRightButtonClick}
          style={{ width: '36px', minWidth: '36px' }}
        >
          <ArrowRightIcon />
        </Button>
      </ButtonContainer>
    </InputLabel>
  </Wrapper>
)

const Wrapper = styled.div``

const LabelText = styled.span`
  display: block;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
