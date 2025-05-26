import { createContext } from 'react'

import type { TDirection } from '@/types/direction'
import type { TMoveSelectedTask, TSelectedTask } from '@/types/selectedTask'

interface BoardContextType {
  isSelectMode: boolean
  selectedTasks: TSelectedTask[]
  toggleSelectMode: () => void
  selectTask: (task: TSelectedTask) => void
  selectBulkTasks: (tasks: TSelectedTask[]) => void
  unselectBulkTasks: (ids: string[]) => void
  unselectTask: (id: string) => void
  clearSelectedTasks: () => void
  isTaskSelected: (id: string) => boolean

  createNewTask: (id: string) => void
  resetNewTaskColumn: () => void
  createNewTaskColumnId: string | null
  getUpdatedSelectedTasksAfterMove: (
    selectedTasks: TSelectedTask[],
    columnOrder: string[],
    direction: TDirection,
  ) => TMoveSelectedTask[]
  updatedSelectedTasksAfterMove: (
    updatedSelectedTasks: TMoveSelectedTask[],
  ) => void
}

export const BoardContext = createContext<BoardContextType>({
  selectedTasks: [],
  isSelectMode: false,
  toggleSelectMode: () => {},
  selectTask: () => {},
  selectBulkTasks: () => {},
  unselectBulkTasks: () => {},
  unselectTask: () => {},
  clearSelectedTasks: () => {},
  isTaskSelected: () => false,

  createNewTask: () => {},
  resetNewTaskColumn: () => {},
  createNewTaskColumnId: null,

  getUpdatedSelectedTasksAfterMove: () => [],
  updatedSelectedTasksAfterMove: () => {},
})
