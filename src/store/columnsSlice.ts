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
  renameColumn: (id: string, newTitle: string) => void
  reorderTask: (
    sourceColumnId: string,
    destColumnId: string,
    taskId: string,
    destIndex: number,
  ) => void
}

export type TColumnsSlice = TState & TActions

export const createColumnsSlice: StateCreator<
  TColumnsSlice,
  [],
  TColumnsSliceMutators
> = immer((set) => ({
  columns: {
    '1': { id: '1', title: 'To Do', taskIds: ['1', '2', '3', '4', '5', '6'] },
    '2': { id: '2', title: 'In Progress', taskIds: ['7', '8', '9', '10'] },
    '3': { id: '3', title: 'Done', taskIds: [] },
  },
  columnOrder: ['1', '2', '3'],

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

  renameColumn: (id, newTitle) => {
    set((state) => {
      if (state.columns[id]) {
        state.columns[id].title = newTitle.trim()
      }
    })
  },

  reorderTask: (
    sourceColumnId: string,
    destColumnId: string,
    taskId: string,
    destIndex: number,
  ) => {
    set((state) => {
      const sourceColumn = state.columns[sourceColumnId]
      const destColumn = state.columns[destColumnId]

      if (!sourceColumn || !destColumn) return

      sourceColumn.taskIds = sourceColumn.taskIds.filter((id) => id !== taskId)

      destColumn.taskIds.splice(destIndex, 0, taskId)
    })
  },
}))
