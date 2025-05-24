export const columnEndDropZoneKey = Symbol('columnEndDropZoneKey')

export type TColumnEndDropZoneData = {
  [columnEndDropZoneKey]: true
  columnId: string
}

export function isColumnEndDropZoneData(
  value: Record<string | symbol, unknown>,
): value is TColumnEndDropZoneData {
  return Boolean(value[columnEndDropZoneKey])
}
