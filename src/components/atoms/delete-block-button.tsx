import React from 'react'
import styled from 'styled-components'
import Cancel from '@material-ui/icons/Cancel'

interface IDeleteBlockButton {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const DeleteBlockButton = ({ onClick }: IDeleteBlockButton) => (
  <Wrapper type='button' onClick={onClick}>
    <Cancel color='secondary' style={{ fontSize: 40 }} />
    <ButtonText>カラムを削除する</ButtonText>
  </Wrapper>
)

const Wrapper = styled.button`
  display: flex;
  position: absolute;
  top: 0;
  right: -60px;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;
  margin: auto 0;
  padding: 4px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  appearance: none;
`

const ButtonText = styled.span`
  margin-top: 0.5em;
  margin-right: 0.15em;
  font-size: 16px;
  writing-mode: vertical-rl;
  text-orientation: upright;
`
