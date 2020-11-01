import React from 'react'
import { LayoutInputChart } from '../components/templates/layout-input-chart'
import { InputBlocks } from '../components/organisms/input-blocks'
import { ChartBlocks } from '../components/organisms/chart-blocks'

export const App = () => (
  <LayoutInputChart>
    <InputBlocks />
    <ChartBlocks />
  </LayoutInputChart>
)
