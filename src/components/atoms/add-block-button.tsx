import React from 'react'
import styled from 'styled-components'
import AddCircle from '@material-ui/icons/AddCircle'

interface IAddBlockButton {
  onClick: () => void
}

export const AddBlockButton = ({ onClick }: IAddBlockButton) => {
  return (
    <Wrapper type='button' onClick={onClick}>
      <AddCircle color='primary' style={{ fontSize: 40 }} />
    </Wrapper>
  )
}

const Wrapper = styled.button`
  display: flex;
  position: absolute;
  right: 0;
  bottom: -22px;
  left: 0;
  margin: 0 auto;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  appearance: none;
`
