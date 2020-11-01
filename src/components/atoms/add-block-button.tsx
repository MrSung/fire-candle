import React from 'react'
import styled from 'styled-components'
import AddCircle from '@material-ui/icons/AddCircle'

export const AddBlockButton = () => {
  return (
    <Wrapper type='button'>
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
