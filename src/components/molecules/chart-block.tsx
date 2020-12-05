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
      charts[chartId].reduce<{
        seriesFigures: [number, number, number, number][]
        seriesType: 'positive' | 'negative' | ''
      }>(
        (acc, chartValue) => {
          const { lowPrice, highPrice, openRate, closeRate } = chartValue
          return {
            ...acc,
            seriesFigures: [
              ...acc.seriesFigures,
              [
                Number(lowPrice),
                Number(highPrice),
                Number(openRate),
                Number(closeRate)
              ]
            ],
            seriesType:
              Number(openRate) < Number(closeRate) ? 'positive' : 'negative'
          }
        },
        { seriesFigures: [], seriesType: '' }
      )
  )(state)
}

const initialOptionsValue: Highcharts.Options = {
  chart: {
    type: 'boxplot'
  },
  title: {
    text: 'ローソク足チャート'
  },
  xAxis: [],
  yAxis: [],
  series: []
}

interface IOptionReducerPayload {
  xAxisCategories: string[]
  seriesFigures: [number, number, number, number][]
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
      data: action.payload.seriesFigures
    }
  ]
})

interface IChartBlockProps extends HighchartsReact.Props {
  id: string
}

export const ChartBlock = (props: IChartBlockProps) => {
  const charts = useSelector((state: RootState) => state.charts)
  const xAxisCategories = getXAxisCategories(charts, props.id)
  const { seriesFigures } = getSeriesData(charts, props.id)

  const [options, localDispatch] = useReducer(
    optionsReducer,
    initialOptionsValue
  )

  useEffect(() => {
    localDispatch({
      payload: { xAxisCategories, seriesFigures }
    })
  }, [charts]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
