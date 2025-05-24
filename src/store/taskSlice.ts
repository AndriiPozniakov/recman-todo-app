import { type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { safeUUID } from '@/utils/safeUUID.ts'

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
    tasks: {
      '1': { id: '1', title: 'Set up project' },
      '2': { id: '2', title: 'Create components' },
      '3': { id: '3', title: 'Add routing' },
      '4': { id: '4', title: 'Implement state management' },
      '5': { id: '5', title: 'Design UI' },
      '6': { id: '6', title: 'Connect API' },
      '7': { id: '7', title: 'Write tests' },
      '8': { id: '8', title: 'Fix bugs' },
      '9': { id: '9', title: 'Deploy to production' },
      '10': { id: '10', title: 'Celebrate launch!' },
    },

    addTask: (todo) => {
      set((state) => {
        const id = safeUUID()
        state.tasks[id] = { id, ...todo }
      })
    },

    removeTask: (id) =>
      set((state) => {
        delete state.tasks[id]
      }),
  }))
