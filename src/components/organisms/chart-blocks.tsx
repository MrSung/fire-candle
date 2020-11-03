import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../app/reducer'
import { ChartBlock } from '../molecules/chart-block'

export const ChartBlocks = () => {
  const charts = useSelector((state: RootState) => state.charts)

  return (
    <Wrapper>
      {charts.map(chart => (
        <ChartBlockWrap key={chart.id}>
          <ChartBlock />
        </ChartBlockWrap>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
`

const ChartBlockWrap = styled.div`
  height: 100%;
  margin-left: 40px;
  padding: 28px 28px 40px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);
`
