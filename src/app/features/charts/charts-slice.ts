import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

const initialRandomId: string = nanoid()

export interface IChartValue {
  id: string
  nthDay: string
  openRate: string
  closeRate: string
  lowPrice: string
  highPrice: string
  isSelected: boolean
}

export const initialChartValue: IChartValue = {
  id: initialRandomId,
  nthDay: '1',
  openRate: '',
  closeRate: '',
  lowPrice: '',
  highPrice: '',
  isSelected: true
}

export interface IChart {
  [id: string]: IChartValue[]
}

export const initialChartsState: IChart = {
  [initialRandomId]: [initialChartValue]
}

export const chartsSlice = createSlice({
  name: 'charts',
  initialState: initialChartsState,
  reducers: {
    setChart: (
      state,
      { payload }: PayloadAction<{ currentChart: IChartValue }>
    ) => ({
      ...state,
      [payload.currentChart.id]: state[
        payload.currentChart.id
      ].map(chartValue =>
        chartValue.nthDay === payload.currentChart.nthDay
          ? { ...chartValue, ...payload.currentChart }
          : { ...chartValue }
      )
    }),
    incrementNthDay: (
      state,
      { payload }: PayloadAction<{ currentId: string }>
    ) => {
      const currentChart = state[payload.currentId].find(
        chartValue => chartValue.isSelected
      )
      const currentChartIndex = state[payload.currentId].findIndex(
        chartValue => chartValue.isSelected
      )
      const currentChartCount = state[payload.currentId].length
      if (typeof currentChart === 'undefined' || currentChartIndex === -1) {
        return
      }
      const currentNthDay = currentChart.nthDay
      state[payload.currentId].forEach(chartValue => {
        chartValue.isSelected = false
      })
      if (currentChartIndex + 1 >= currentChartCount) {
        state[payload.currentId].push({
          ...initialChartValue,
          id: payload.currentId,
          nthDay: String(Number(currentNthDay) + 1)
        })
        return
      }
      state[payload.currentId][currentChartIndex + 1].isSelected = true
    },
    decrementNthDay: (
      state,
      { payload }: PayloadAction<{ currentId: string }>
    ) => {
      const currentChartIndex = state[payload.currentId].findIndex(
        chartValue => chartValue.isSelected
      )
      if (currentChartIndex === -1) {
        return
      }
      state[payload.currentId].forEach(chartValue => {
        chartValue.isSelected = false
      })
      state[payload.currentId][currentChartIndex - 1].isSelected = true
    }
  }
})

export const chartsReducer = chartsSlice.reducer
