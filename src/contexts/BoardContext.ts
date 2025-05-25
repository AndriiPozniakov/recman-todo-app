import { createContext } from 'react'

interface BoardContextType {
  isSelectMode: boolean
  selectedTaskIds: Array<string>
  toggleSelectMode: () => void
  selectTask: (id: string) => void
  selectBulkTasks: (ids: string[]) => void
  unselectBulkTasks: (ids: string[]) => void
  unselectTask: (id: string) => void
  clearSelectedTasks: () => void
  isTaskSelected: (id: string) => boolean

  createNewTask: (id: string) => void
  resetNewTaskColumn: () => void
  createNewTaskColumnId: string | null
}

export const BoardContext = createContext<BoardContextType>({
  selectedTaskIds: [],
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
