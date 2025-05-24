import type { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type TProjectSliceMutators = [['zustand/immer', never]]

type TState = {
  projectTitle: string
}

type TActions = {
  setProjectTitle: (newTitle: string) => void
}

export type TProjectSlice = TState & TActions

export const createProjectSlice: StateCreator<
  TProjectSlice,
  [],
  TProjectSliceMutators
> = immer((set) => ({
  projectTitle: 'Project Name',

  setProjectTitle: (newTitle) =>
    set((state) => {
      state.projectTitle = newTitle
    }),
}))
