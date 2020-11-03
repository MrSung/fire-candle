import React from 'react'
import styled from 'styled-components'
import AddCircle from '@material-ui/icons/AddCircle'

interface IAddBlockButton {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const AddBlockButton = ({ onClick }: IAddBlockButton) => {
  return (
    <Wrapper type='button' onClick={onClick}>
      <AddCircle color='primary' style={{ fontSize: 40 }} />
      <ButtonText>カラムを追加する</ButtonText>
    </Wrapper>
  )
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  margin: 12px auto 0;
  padding: 4px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  appearance: none;
`

const ButtonText = styled.span`
  margin-left: 0.5em;
  font-size: 16px;
`
