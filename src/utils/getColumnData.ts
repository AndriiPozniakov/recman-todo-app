import { columnKey, type TColumn, type TColumnData } from '@/types'

export function getColumnData(column: TColumn): TColumnData {
  return {
    [columnKey]: true,
    column,
  }
}
