import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

export interface IChart {
  id: string
  openRate: number
  closeRate: number
  lowPrice: number
  labelText: number
}

export const chartsInitialState: IChart[] = [
  {
    id: '',
    openRate: 0,
    closeRate: 0,
    lowPrice: 0,
    labelText: 0
  }
]

export const chartsSlice = createSlice({
  name: 'charts',
  initialState: chartsInitialState,
  reducers: {
    addNewInput: {
      reducer: (state, { payload }: PayloadAction<IChart>) => {
        state.push(payload)
      },
      prepare: (chart: IChart) => ({
        payload: {
          ...chart,
          id: nanoid()
        }
      })
    },
    edit: (state, { payload }: PayloadAction<IChart>) => {
      const matchedItem = state.find(item => payload.id === item.id)
      if (typeof matchedItem === 'undefined') {
        return
      }
      matchedItem.openRate = payload.openRate
      matchedItem.closeRate = payload.closeRate
      matchedItem.lowPrice = payload.lowPrice
      matchedItem.labelText = payload.labelText
    }
  }
})

export const chartsReducer = chartsSlice.reducer
