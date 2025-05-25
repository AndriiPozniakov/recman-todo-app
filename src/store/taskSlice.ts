import { type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { safeUUID } from '@/utils/safeUUID.ts'

import type { TTask } from '@/types'

type TTaskSliceMutators = [['zustand/immer', never]]

type TTaskInput = Omit<TTask, 'id' | 'isCompleted'>
type TState = { tasks: Record<string, TTask> }
type TActions = {
  addTask: (todo: TTaskInput) => void
  removeTask: (id: string) => void
  toggleComplete: (id: string) => void
  renameTask: (id: string, newTitle: string) => void
}

export type TTaskSlice = TState & TActions

export const createTaskSlice: StateCreator<TTaskSlice, [], TTaskSliceMutators> =
  immer((set) => ({
    tasks: {
      '1': { id: '1', title: 'Set up project', isCompleted: false },
      '2': { id: '2', title: 'Create components', isCompleted: false },
      '3': { id: '3', title: 'Add routing', isCompleted: false },
      '4': { id: '4', title: 'Implement state management', isCompleted: false },
      '5': { id: '5', title: 'Design UI', isCompleted: true },
      '6': { id: '6', title: 'Connect API', isCompleted: false },
      '7': { id: '7', title: 'Write tests', isCompleted: false },
      '8': { id: '8', title: 'Fix bugs', isCompleted: false },
      '9': { id: '9', title: 'Deploy to production', isCompleted: false },
      '10': { id: '10', title: 'Celebrate launch!', isCompleted: false },
    },

    addTask: (todo) => {
      set((state) => {
        const id = safeUUID()
        state.tasks[id] = { id, isCompleted: false, ...todo }
      })
    },

    removeTask: (id) =>
      set((state) => {
        delete state.tasks[id]
      }),

    toggleComplete: (id) =>
      set((state) => {
        const task = state.tasks[id]
        if (task) {
          task.isCompleted = !task.isCompleted
        }
      }),

    renameTask: (id, newTitle) =>
      set((state) => {
        const task = state.tasks[id]
        if (task) {
          task.title = newTitle.trim()
        }
      }),
  }))
