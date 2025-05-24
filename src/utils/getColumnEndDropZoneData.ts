import {
  columnEndDropZoneKey,
  type TColumnEndDropZoneData,
} from '@/types/columnEndDropZone'

export const getColumnEndDropZoneData = (
  columnId: string,
): TColumnEndDropZoneData => {
  return {
    [columnEndDropZoneKey]: true,
    columnId,
  }
}
