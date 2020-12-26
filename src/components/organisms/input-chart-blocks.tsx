import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../app/reducer'
import { InputBlock } from '../molecules/input-block'
import { ChartBlock } from '../molecules/chart-block'

export const InputChartBlocks = () => {
  const charts = useSelector((state: RootState) => state.charts)
  const chartsValues = Object.values(charts)

  return (
    <Wrapper>
      {chartsValues.map(arr => {
        const id = arr[0].id
        const selected = arr.find(a => a.isSelected)

        return typeof selected === 'undefined' ? null : (
          <Container key={id}>
            <InputBlockWrap>
              <InputBlock
                id={id}
                nthDay={selected.nthDay}
                openRate={selected.openRate}
                closeRate={selected.closeRate}
                lowPrice={selected.lowPrice}
                highPrice={selected.highPrice}
              />
            </InputBlockWrap>
            <ChartBlockWrap>
              <ChartBlock id={id} />
            </ChartBlockWrap>
          </Container>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 1110px;
  margin: 0 auto;
  padding: 60px 0;
`

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 320px auto;
  grid-template-rows: 1fr;
  gap: 40px 40px;

  &:not(:last-of-type) {
    margin-bottom: 48px;
  }
`

const InputBlockWrap = styled.div`
  padding: 28px 28px 32px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);

  & + & {
    margin-top: 32px;
  }
`

const ChartBlockWrap = styled.div`
  padding: 28px 28px 40px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);
`
