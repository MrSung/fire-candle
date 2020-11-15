import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../app/reducer'
import { chartsSlice } from '../../features/charts/charts-slice'
import { InputBlock } from '../molecules/input-block'
import { ChartBlock } from '../molecules/chart-block'
import { DeleteBlockButton } from '../atoms/delete-block-button'
import { AddBlockButton } from '../atoms/add-block-button'

export const InputChartBlocks = () => {
  const charts = useSelector((state: RootState) => state.charts)
  const chartsValues = Object.values(charts)
  const dispatch = useDispatch()
  const { addNewColumn, deleteColumn } = chartsSlice.actions

  return (
    <Wrapper>
      {chartsValues.map(arr => {
        const chartId = arr[0].id
        const selected = arr.find(a => a.isSelected)
        if (typeof selected === 'undefined') {
          return null
        }
        return (
          <Container key={chartId}>
            <InputBlockWrap>
              <InputBlock
                chartId={chartId}
                playerName={selected.playerName}
                nthDayValue={selected.nthDay}
                openRateValue={selected.openRate}
                closeRateValue={selected.closeRate}
                lowPriceValue={selected.lowPrice}
                highPriceValue={selected.highPrice}
              />
            </InputBlockWrap>
            <ChartBlockWrap>
              <ChartBlock />
            </ChartBlockWrap>
            <DeleteBlockButton
              onClick={() => {
                dispatch(deleteColumn({ id: chartId }))
              }}
            />
          </Container>
        )
      })}
      <AddBlockButton
        onClick={() => {
          dispatch(
            addNewColumn({
              newRandomId: nanoid()
            })
          )
        }}
      />
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
