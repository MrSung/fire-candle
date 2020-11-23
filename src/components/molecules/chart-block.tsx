import React from 'react'
import styled from 'styled-components'
import * as Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'

HighchartsMore(Highcharts)

const options: Highcharts.Options = {
  title: {
    text: 'ローソク足チャート'
  },
  xAxis: [
    {
      categories: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
      ],
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
      data: [
        [6, 8],
        [5.9, 7.6],
        [9.4, 10.4],
        [14.1, 15.9],
        [18.0, 20.1],
        [21.0, 24.0],
        [23.2, 25.3],
        [26.1, 27.8],
        [23.2, 23.9],
        [18.0, 21.1],
        [12.9, 14.0],
        [7.6, 10.0]
      ]
    }
  ]
}

export const ChartBlock = (props: HighchartsReact.Props) => {
  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
