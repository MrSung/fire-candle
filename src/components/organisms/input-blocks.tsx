import React from 'react'
import styled from 'styled-components'
import { InputBlock } from '../molecules/input-block'
import { AddBlockButton } from '../atoms/add-block-button'

export const InputBlocks = () => {
  return (
    <Wrapper>
      <InputBlock />
      <AddBlockButton />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 400px;
  padding: 28px 28px 32px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);
`
