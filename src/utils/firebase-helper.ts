import { ICharts, IChartValue } from '../app/features/charts/charts-slice'

export const formatChartsWithObjId = (wrapperObj: ICharts): IChartValue[] => {
  const wrapperObjKeys = Object.keys(wrapperObj)
  // @ts-ignore: fix this
  return wrapperObjKeys.reduce((arr, id) => {
    return [...arr, { ...wrapperObj[id], id }]
  }, [])
}
