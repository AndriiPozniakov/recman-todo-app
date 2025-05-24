import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createColumnsSlice, type TColumnsSlice } from './columnsSlice.ts'
import { createTaskSlice, type TTaskSlice } from './taskSlice.ts'

type Store = TTaskSlice & TColumnsSlice

export const useAppStore = create<Store>()(
  persist(
    (...a) => ({
      ...createTaskSlice(...a),
      ...createColumnsSlice(...a),
    }),
    {
      name: 'todo-app-storage',
    },
  ),
)
