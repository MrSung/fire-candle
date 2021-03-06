import React, { CSSProperties } from 'react'
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
  onLeftButtonClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
  isLeftButtonDisabled: boolean
  onRightButtonClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
  isRightButtonDisabled: boolean
}

export const InputSwitcher = ({
  inputId,
  type,
  value,
  placeholder,
  labelText,
  onLeftButtonClick,
  isLeftButtonDisabled,
  onRightButtonClick,
  isRightButtonDisabled
}: IInputSwitcherProps) => (
  <Wrapper>
    <InputLabel style={InputLabelStyle}>
      <LabelText>{labelText}</LabelText>
      <ButtonContainer>
        <Button
          onClick={onLeftButtonClick}
          disabled={isLeftButtonDisabled}
          style={{ width: '36px', minWidth: '36px' }}
        >
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
          disabled={isRightButtonDisabled}
          style={{ width: '36px', minWidth: '36px' }}
        >
          <ArrowRightIcon />
        </Button>
      </ButtonContainer>
    </InputLabel>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
`

const InputLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center'
}

const LabelText = styled.span`
  display: inline-block;
`

const ButtonContainer = styled.div`
  display: flex;
`
