import { type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { Todo } from '@/types'

type TodoSliceMutators = [['zustand/immer', never]]

type TodoInput = Omit<Todo, 'id'>
type State = { todos: Record<string, Todo> }
type Actions = {
  addTodo: (todo: TodoInput) => void
  removeTodo: (id: string) => void
}

export type TodoSlice = State & Actions

export const createTaskSlice: StateCreator<TodoSlice, [], TodoSliceMutators> =
  immer((set) => ({
    todos: {},

    addTodo: (todo) => {
      set((state) => {
        const id = crypto.randomUUID()
        state.todos[id] = { id, ...todo }
      })
    },

    removeTodo: (id) =>
      set((state) => {
        delete state.todos[id]
      }),
  }))
