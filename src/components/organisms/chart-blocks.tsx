import React from 'react'
import styled from 'styled-components'
import { ChartBlock } from '../molecules/chart-block'

export const ChartBlocks = () => {
  return (
    <Wrapper>
      <ChartBlock />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
  margin-left: 40px;
  padding: 28px 28px 40px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);
`
