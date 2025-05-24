import { columnKey, type TColumnData, type TColumnWithTasks } from '@/types'

export const getColumnData = (column: TColumnWithTasks): TColumnData => {
  return {
    [columnKey]: true,
    column,
  }
}
