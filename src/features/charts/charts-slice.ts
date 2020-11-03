import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    playerName: '',
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
    edit: (state, { payload }: PayloadAction<IChart>) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.playerName = payload.playerName
      matchedItem.nthDay = payload.nthDay
      matchedItem.openRate = payload.openRate
      matchedItem.closeRate = payload.closeRate
      matchedItem.lowPrice = payload.lowPrice
      matchedItem.highPrice = payload.highPrice
    }
  }
})

export const chartsReducer = chartsSlice.reducer
