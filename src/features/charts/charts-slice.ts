import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

export interface IChart {
  id: string
  playerName: string
  nthDay: number
  openRate: number
  closeRate: number
  lowPrice: number
  highPrice: number
}

export const chartsInitialState: IChart[] = [
  {
    id: '',
    playerName: nanoid(),
    nthDay: 1,
    openRate: 0,
    closeRate: 0,
    lowPrice: 0,
    highPrice: 0
  }
]

export const chartsSlice = createSlice({
  name: 'charts',
  initialState: chartsInitialState,
  reducers: {
    addNewInput: (state, { payload }: PayloadAction<IChart>) => {
      state.push(payload)
    },
    editPlayerName: (
      state,
      { payload }: PayloadAction<{ id: string; playerName: string }>
    ) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.playerName = payload.playerName
    },
    editNthDay: (
      state,
      { payload }: PayloadAction<{ id: string; nthDay: number }>
    ) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.nthDay = payload.nthDay
    },
    editOpenRate: (
      state,
      { payload }: PayloadAction<{ id: string; openRate: number }>
    ) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.openRate = payload.openRate
    },
    editCloseRate: (
      state,
      { payload }: PayloadAction<{ id: string; closeRate: number }>
    ) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.closeRate = payload.closeRate
    },
    editLowPrice: (
      state,
      { payload }: PayloadAction<{ id: string; lowPrice: number }>
    ) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.lowPrice = payload.lowPrice
    },
    editHighPrice: (
      state,
      { payload }: PayloadAction<{ id: string; highPrice: number }>
    ) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.highPrice = payload.highPrice
    }
  }
})

export const chartsReducer = chartsSlice.reducer
