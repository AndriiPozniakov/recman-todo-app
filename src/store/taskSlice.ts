import { type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { TTask } from '@/types'

type TTaskSliceMutators = [['zustand/immer', never]]

type TTaskInput = Omit<TTask, 'id'>
type TState = { tasks: Record<string, TTask> }
type TActions = {
  addTask: (todo: TTaskInput) => void
  removeTask: (id: string) => void
}

export type TTaskSlice = TState & TActions

export const createTaskSlice: StateCreator<TTaskSlice, [], TTaskSliceMutators> =
  immer((set) => ({
    tasks: {},

    addTask: (todo) => {
      set((state) => {
        const id = crypto.randomUUID()
        state.tasks[id] = { id, ...todo }
      })
    },

    removeTask: (id) =>
      set((state) => {
        delete state.tasks[id]
      }),
  }))
