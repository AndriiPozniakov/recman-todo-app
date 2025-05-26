import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'

import type { TDirection } from '@/types/direction'
import type { TMoveSelectedTask, TSelectedTask } from '@/types/selectedTask'

import { BoardContext } from './BoardContext'

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState<TSelectedTask[]>([])
  const [createNewTaskColumnId, setCreateNewTaskColumnId] = useState<
    string | null
  >(null)

  const handleToggleSelectMode = useCallback(() => {
    setIsSelectMode((prev) => {
      const next = !prev
      if (!next) setSelectedTasks([])
      return next
    })
  }, [])

  const selectTask = useCallback((task: TSelectedTask) => {
    setSelectedTasks((prev) => {
      if (prev.some((t) => t.taskId === task.taskId)) return prev
      return [...prev, task]
    })
  }, [])

  const selectBulkTasks = useCallback(
    (tasks: TSelectedTask[]) => {
      if (!isSelectMode) setIsSelectMode(true)

      setSelectedTasks((prev) => {
        const newTasks = tasks.filter(
          (task) => !prev.some((t) => t.taskId === task.taskId),
        )
        return [...prev, ...newTasks]
      })
    },
    [isSelectMode],
  )

  const unselectTask = useCallback((taskId: string) => {
    setSelectedTasks((prev) => prev.filter((t) => t.taskId !== taskId))
  }, [])

  const unselectBulkTasks = useCallback((taskIds: string[]) => {
    setSelectedTasks((prev) => {
      const filtered = prev.filter((t) => !taskIds.includes(t.taskId))
      if (filtered.length === 0) setIsSelectMode(false)
      return filtered
    })
  }, [])

  const clearSelectedTasks = useCallback(() => {
    setIsSelectMode(false)
    setSelectedTasks([])
  }, [])

  const isTaskSelected = useCallback(
    (taskId: string) => selectedTasks.some((t) => t.taskId === taskId),
    [selectedTasks],
  )

  const createNewTask = useCallback((columnId: string) => {
    setCreateNewTaskColumnId(columnId)
  }, [])

  const resetNewTaskColumn = useCallback(() => {
    setCreateNewTaskColumnId(null)
  }, [])

  const getUpdatedSelectedTasksAfterMove = useCallback(
    (
      selectedTasks: TSelectedTask[],
      columnOrder: string[],
      direction: TDirection,
    ) => {
      return selectedTasks.map(({ taskId, columnId }) => {
        const currentIndex = columnOrder.indexOf(columnId)
        if (currentIndex === -1)
          return { taskId, columnId, destColumnId: columnId }

        const newIndex =
          direction === 'left' ? currentIndex - 1 : currentIndex + 1
        if (newIndex < 0 || newIndex >= columnOrder.length) {
          return { taskId, columnId, destColumnId: columnId }
        }

        return {
          taskId,
          columnId: columnOrder[currentIndex],
          destColumnId: columnOrder[newIndex],
        }
      })
    },
    [],
  )

  const updatedSelectedTasksAfterMove = useCallback(
    (updatedSelectedTasks: TMoveSelectedTask[]) => {
      setSelectedTasks(
        updatedSelectedTasks.map(({ taskId, destColumnId }) => ({
          taskId,
          columnId: destColumnId,
        })),
      )
    },
    [],
  )

  const value = useMemo(
    () => ({
      isSelectMode,
      toggleSelectMode: handleToggleSelectMode,
      selectedTasks,
      selectTask,
      unselectTask,
      unselectBulkTasks,
      clearSelectedTasks,
      selectBulkTasks,
      isTaskSelected,
      createNewTask,
      createNewTaskColumnId,
      resetNewTaskColumn,
      getUpdatedSelectedTasksAfterMove,
      updatedSelectedTasksAfterMove,
    }),
    [
      isSelectMode,
      handleToggleSelectMode,
      selectedTasks,
      selectTask,
      unselectTask,
      unselectBulkTasks,
      clearSelectedTasks,
      selectBulkTasks,
      isTaskSelected,
      createNewTask,
      createNewTaskColumnId,
      resetNewTaskColumn,
      getUpdatedSelectedTasksAfterMove,
      updatedSelectedTasksAfterMove,
    ],
  )

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
