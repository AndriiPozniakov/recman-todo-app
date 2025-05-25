import { createContext } from 'react'

interface BoardContextType {
  // selectedTaskIds: string[]
  isSelectMode: boolean
  // setSelectedTaskIds?: (ids: string[]) => void
  toggleSelectMode: () => void
}

export const BoardContext = createContext<BoardContextType>({
  // selectedTaskIds: [],
  isSelectMode: false,
  toggleSelectMode: () => {},
})
