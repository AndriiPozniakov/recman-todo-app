import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'

import { BoardContext } from './BoardContext'

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([])
  const [createNewTaskColumnId, setCreateNewTaskColumnId] = useState<
    string | null
  >(null)

  const handleToggleSelectMode = useCallback(() => {
    setIsSelectMode((prev) => {
      const next = !prev
      if (!next) setSelectedTaskIds([])
      return next
    })
  }, [])

  const selectTask = useCallback((id: string) => {
    setSelectedTaskIds((prev) => [...prev, id])
  }, [])

  const selectBulkTasks = useCallback(
    (ids: string[]) => {
      if (!isSelectMode) setIsSelectMode(true)

      setSelectedTaskIds((prev) => [...prev, ...ids])
    },
    [isSelectMode],
  )

  const unselectBulkTasks = useCallback((ids: string[]) => {
    setSelectedTaskIds((prev) => {
      const newSelected = prev.filter((taskId) => !ids.includes(taskId))

      if (newSelected.length === 0) {
        setIsSelectMode(false)
      }

      return newSelected
    })
  }, [])

  const unselectTask = useCallback((id: string) => {
    setSelectedTaskIds((prev) => prev.filter((taskId) => taskId !== id))
  }, [])

  const clearSelectedTasks = useCallback(() => {
    setSelectedTaskIds([])
  }, [])

  const isTaskSelected = useCallback(
    (id: string) => selectedTaskIds.includes(id),
    [selectedTaskIds],
  )

  const createNewTask = useCallback((columnId: string) => {
    setCreateNewTaskColumnId(columnId)
  }, [])

  const resetNewTaskColumn = useCallback(() => {
    setCreateNewTaskColumnId(null)
  }, [])

  const value = useMemo(
    () => ({
      isSelectMode,
      toggleSelectMode: handleToggleSelectMode,
      selectedTaskIds,
      selectTask,
      unselectTask,
      unselectBulkTasks,
      clearSelectedTasks,
      selectBulkTasks,
      isTaskSelected,
      createNewTask,
      createNewTaskColumnId,
      resetNewTaskColumn,
    }),
    [
      isSelectMode,
      handleToggleSelectMode,
      selectedTaskIds,
      selectTask,
      unselectTask,
      unselectBulkTasks,
      clearSelectedTasks,
      selectBulkTasks,
      isTaskSelected,
      createNewTask,
      createNewTaskColumnId,
      resetNewTaskColumn,
    ],
  )

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
