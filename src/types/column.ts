import type { TTask } from './task'

export const columnKey = Symbol('column')

export type TColumn = {
  id: string
  title: string
  taskIds: string[]
}

export type TColumnWithTasks = TColumn & {
  tasks: TTask[]
}

export type TColumnData = {
  [columnKey]: true
  column: TColumnWithTasks
}

export function isColumnData(
  value: Record<string | symbol, unknown>,
): value is TColumnData {
  return Boolean(value[columnKey])
}

export function isDraggingAColumn({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isColumnData(source.data)
}
