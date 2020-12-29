import React, { useReducer, useEffect } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import { ISchema } from '../../app/reducer'

HighchartsMore(Highcharts)

const getXAxisCategories = (state: ISchema['charts'], chartId: string) => {
  return createSelector(
    (state: ISchema['charts']) => state,
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
  seriesType: SeriesType[]
}

const getSeriesData = (state: ISchema['charts'], chartId: string) => {
  return createSelector(
    (state: ISchema['charts']) => state,
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
            seriesType: [
              ...acc.seriesType,
              Number(openRate) !== Number(closeRate)
                ? Number(openRate) < Number(closeRate)
                  ? SeriesType.Positive
                  : SeriesType.Negative
                : SeriesType.Identical
            ]
          }
        },
        {
          seriesLowHigh: [],
          seriesOpenClose: [],
          seriesType: []
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

interface IOptionReducerPayload extends ISeries {
  xAxisCategories: string[]
}

type OptionsReducerType = (
  state: Highcharts.Options,
  action: { payload: IOptionReducerPayload }
) => Highcharts.Options

const labelColorReducer = (
  seriesType: SeriesType.Positive | SeriesType.Negative | SeriesType.Identical
) => {
  switch (seriesType) {
    case SeriesType.Positive:
      return '#f7a35c'
    case SeriesType.Negative:
      return '#7cb6ec'
    case SeriesType.Identical:
      return '#9e9fa3'
    default:
      return ''
  }
}

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
      data: action.payload.seriesOpenClose,
      columnrange: {
        colors: action.payload.seriesType.map(type => labelColorReducer(type))
      }
    }
  ]
})

interface IChartBlockProps extends HighchartsReact.Props {
  id: string
}

export const ChartBlock = (props: IChartBlockProps) => {
  const charts = useSelector((state: ISchema) => state.charts)
  const xAxisCategories = getXAxisCategories(charts, props.id)
  const { seriesLowHigh, seriesOpenClose, seriesType } = getSeriesData(
    charts,
    props.id
  )

  const [options, localDispatch] = useReducer(
    optionsReducer,
    initialOptionsValue
  )

  useEffect(() => {
    localDispatch({
      payload: { xAxisCategories, seriesLowHigh, seriesOpenClose, seriesType }
    })
  }, [charts]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
