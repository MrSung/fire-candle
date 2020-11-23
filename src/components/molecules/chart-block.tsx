import React, { useReducer, useEffect } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import { RootState } from '../../app/reducer'

HighchartsMore(Highcharts)

const getXAxisCategories = (state: RootState, chartId: string) => {
  return createSelector(
    (state: RootState) => state.charts,
    charts => charts[chartId].map(chartValue => chartValue.nthDay)
  )(state)
}

const getSeriesData = (state: RootState, chartId: string) => {
  return createSelector(
    (state: RootState) => state.charts,
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
  const selector = useSelector((state: RootState) => state)
  const xAxisCategories = getXAxisCategories(selector, props.id)
  const seriesData = getSeriesData(selector, props.id)

  const [options, localDispatch] = useReducer(
    optionsReducer,
    initialOptionsValue
  )

  useEffect(() => {
    localDispatch({ payload: { xAxisCategories, seriesData } })
  }, [selector])

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
