import type { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { TColumn } from '@/types'

type TColumnsSliceMutators = [['zustand/immer', never]]

type TColumnInput = Omit<TColumn, 'id' | 'taskIds'>
type TState = { columns: Record<string, TColumn>; columnOrder: string[] }
type TActions = {
  addColumn: (column: TColumnInput) => void
  removeColumn: (id: string) => void
  reorderColumns: (sourceId: number, targetId: number) => void
}

export type TColumnsSlice = TState & TActions

export const createColumnsSlice: StateCreator<
  TColumnsSlice,
  [],
  TColumnsSliceMutators
> = immer((set) => ({
  columns: {
    '1': { id: '1', title: 'To Do', taskIds: [] },
    '2': { id: '2', title: 'In Progress', taskIds: [] },
    '3': { id: '3', title: 'Done', taskIds: [] },
    '4': { id: '4', title: 'Done 4', taskIds: [] },
    '5': { id: '5', title: 'Done 5', taskIds: [] },
    '6': { id: '6', title: 'Done 6', taskIds: [] },
  },
  columnOrder: ['1', '2', '3', '4', '5', '6'],

  addColumn: (column) => {
    const id = crypto.randomUUID()
    set((state) => {
      state.columns[id] = { id, taskIds: [], ...column }
      state.columnOrder.push(id)
    })
  },

  removeColumn: (id) => {
    set((state) => {
      delete state.columns[id]
      state.columnOrder = state.columnOrder.filter((cid) => cid !== id)
    })
  },

  reorderColumns: (sourceIdx: number, targetIdx: number) => {
    set((state) => {
      const order = state.columnOrder
      // const sourceIdx = order.indexOf(sourceId)
      // const targetIdx = order.indexOf(targetId)

      if (sourceIdx === -1 || targetIdx === -1) return

      const [removed] = order.splice(sourceIdx, 1)
      order.splice(targetIdx, 0, removed)
    })
  },
}))
