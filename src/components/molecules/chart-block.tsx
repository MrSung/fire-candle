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

enum SeriesType {
  Positive = 'positive',
  Negative = 'negative',
  Identical = 'identical'
}

interface ISeries {
  seriesLowHigh: [number, number][]
  seriesOpenClose: [number, number][]
  seriesType: SeriesType.Positive | SeriesType.Negative | SeriesType.Identical
}

const getSeriesData = (state: RootState['charts'], chartId: string) => {
  return createSelector(
    (state: RootState['charts']) => state,
    charts =>
      charts[chartId].reduce<ISeries>(
        (acc, chartValue) => {
          const { lowPrice, highPrice, openRate, closeRate } = chartValue
          return {
            ...acc,
            seriesLowHigh: [
              ...acc.seriesLowHigh,
              [Number(lowPrice), Number(highPrice)]
            ],
            seriesOpenClose: [
              ...acc.seriesOpenClose,
              [Number(openRate), Number(closeRate)]
            ],
            seriesType:
              Number(openRate) < Number(closeRate)
                ? SeriesType.Positive
                : SeriesType.Negative
          }
        },
        {
          seriesLowHigh: [],
          seriesOpenClose: [],
          seriesType: SeriesType.Identical
        }
      )
  )(state)
}

const initialOptionsValue: Highcharts.Options = {
  title: {
    text: 'ローソク足チャート'
  },
  xAxis: [],
  yAxis: [],
  legend: {
    enabled: false
  },
  series: []
}

interface IOptionReducerPayload {
  xAxisCategories: string[]
  seriesLowHigh: [number, number][]
  seriesOpenClose: [number, number][]
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
      data: action.payload.seriesLowHigh
    },
    {
      name: '始値・終値',
      type: 'columnrange',
      data: action.payload.seriesOpenClose
    }
  ]
})

interface IChartBlockProps extends HighchartsReact.Props {
  id: string
}

export const ChartBlock = (props: IChartBlockProps) => {
  const charts = useSelector((state: RootState) => state.charts)
  const xAxisCategories = getXAxisCategories(charts, props.id)
  const { seriesLowHigh, seriesOpenClose } = getSeriesData(charts, props.id)

  const [options, localDispatch] = useReducer(
    optionsReducer,
    initialOptionsValue
  )

  useEffect(() => {
    localDispatch({
      payload: { xAxisCategories, seriesLowHigh, seriesOpenClose }
    })
  }, [charts]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
