import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createTaskSlice, type TodoSlice } from './todoSlice.ts'

type Store = TodoSlice

export const useAppStore = create<Store>()(
  persist(
    (...a) => ({
      ...createTaskSlice(...a),
    }),
    {
      name: 'todo-app-storage',
    },
  ),
)
