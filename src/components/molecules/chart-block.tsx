import React, { useReducer, useEffect } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import { RootState } from '../../app/reducer'

HighchartsMore(Highcharts)

const getXAxisCategories = (state: RootState['charts'], chartId: string) => {
  return createSelector(
    (state: RootState['charts']) => state,
    charts => charts[chartId].map(chartValue => chartValue.nthDay)
  )(state)
}

const getSeriesData = (state: RootState['charts'], chartId: string) => {
  return createSelector(
    (state: RootState['charts']) => state,
    charts =>
      charts[chartId].reduce<[number, number][]>((acc, chartValue) => {
        const { lowPrice, highPrice } = chartValue
        return [...acc, [Number(lowPrice), Number(highPrice)]]
      }, [])
  )(state)
}

const initialOptionsValue: Highcharts.Options = {
  title: {
    text: 'ローソク足チャート'
  },
  xAxis: [],
  yAxis: [],
  series: []
}

interface IOptionReducerPayload {
  xAxisCategories: string[]
  seriesData: [number, number][]
}

type OptionsReducerType = (
  state: Highcharts.Options,
  action: { payload: IOptionReducerPayload }
) => Highcharts.Options

const optionsReducer: OptionsReducerType = (state, action) => ({
  ...state,
  xAxis: [
    {
      categories: action.payload.xAxisCategories,
      title: {
        text: '経過日数（日）'
      }
    }
  ],
  yAxis: [
    {
      title: {
        text: '株価（円）'
      }
    }
  ],
  series: [
    {
      name: '安値・高値',
      type: 'errorbar',
      data: action.payload.seriesData
    }
  ]
})

interface IChartBlockProps extends HighchartsReact.Props {
  id: string
}

export const ChartBlock = (props: IChartBlockProps) => {
  const charts = useSelector((state: RootState) => state.charts)
  const xAxisCategories = getXAxisCategories(charts, props.id)
  const seriesData = getSeriesData(charts, props.id)

  const [options, localDispatch] = useReducer(
    optionsReducer,
    initialOptionsValue
  )

  useEffect(() => {
    localDispatch({ payload: { xAxisCategories, seriesData } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts])

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
