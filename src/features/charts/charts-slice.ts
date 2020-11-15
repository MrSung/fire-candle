import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

const initialRandomId = nanoid()

export interface IChart {
  [id: string]: IChartValue[]
}

export interface IChartValue {
  id: string
  playerName: string
  nthDay: string
  openRate: string
  closeRate: string
  lowPrice: string
  highPrice: string
  isSelected: boolean
}

export const initialChartValue: IChartValue = {
  id: initialRandomId,
  playerName: '',
  nthDay: '',
  openRate: '',
  closeRate: '',
  lowPrice: '',
  highPrice: '',
  isSelected: true
}

export const initialChartsState: IChart = {
  [initialRandomId]: [initialChartValue]
}

export const chartsSlice = createSlice({
  name: 'charts',
  initialState: initialChartsState,
  reducers: {
    addNewColumn: (
      state,
      { payload }: PayloadAction<{ newRandomId: string }>
    ) => ({
      ...state,
      [payload.newRandomId]: [{ ...initialChartValue, id: payload.newRandomId }]
    }),
    deleteColumn: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newState = { ...state }
      delete state[payload.id]
      return newState
    }
    // editPlayerName: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; playerName: string }>
    // ) => {
    //   const matchedItem = state.find(item => payload.id === item.id)
    //   if (typeof matchedItem === 'undefined') {
    //     return
    //   }
    //   matchedItem.playerName = payload.playerName
    // },
    // editNthDay: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; nthDay: string }>
    // ) => {
    //   const matchedItem = state.find(item => payload.id === item.id)
    //   if (typeof matchedItem === 'undefined') {
    //     return
    //   }
    //   matchedItem.nthDay = payload.nthDay
    // },
    // editOpenRate: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; openRate: string }>
    // ) => {
    //   const matchedItem = state.find(item => payload.id === item.id)
    //   if (typeof matchedItem === 'undefined') {
    //     return
    //   }
    //   matchedItem.openRate = payload.openRate
    // },
    // editCloseRate: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; closeRate: string }>
    // ) => {
    //   const matchedItem = state.find(item => payload.id === item.id)
    //   if (typeof matchedItem === 'undefined') {
    //     return
    //   }
    //   matchedItem.closeRate = payload.closeRate
    // },
    // editLowPrice: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; lowPrice: string }>
    // ) => {
    //   const matchedItem = state.find(item => payload.id === item.id)
    //   if (typeof matchedItem === 'undefined') {
    //     return
    //   }
    //   matchedItem.lowPrice = payload.lowPrice
    // },
    // editHighPrice: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; highPrice: string }>
    // ) => {
    //   const matchedItem = state.find(item => payload.id === item.id)
    //   if (typeof matchedItem === 'undefined') {
    //     return
    //   }
    //   matchedItem.highPrice = payload.highPrice
    // }
  }
})

export const chartsReducer = chartsSlice.reducer
