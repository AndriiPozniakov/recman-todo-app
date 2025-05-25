import { createContext } from 'react'

import type { TSelectedTask } from '@/types/selectedTask'

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
})
