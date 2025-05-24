import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createColumnsSlice, type TColumnsSlice } from './columnsSlice'
import { createProjectSlice, type TProjectSlice } from './projectSlice.ts'
import { createTaskSlice, type TTaskSlice } from './taskSlice'

type Store = TProjectSlice & TTaskSlice & TColumnsSlice

export const useAppStore = create<Store>()(
  persist(
    (...a) => ({
      ...createProjectSlice(...a),
      ...createTaskSlice(...a),
      ...createColumnsSlice(...a),
    }),
    {
      name: 'todo-app-storage',
    },
  ),
)
