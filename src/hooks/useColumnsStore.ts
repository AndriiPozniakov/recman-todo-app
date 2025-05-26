import { useMemo } from 'react'

import { useTaskStore } from '@hooks/useTaskStore'

import type { TDirection } from '@/types/direction'
import type { TSelectedTask } from '@/types/selectedTask'

import { useBoardContext } from '@/contexts/useBoardContext'
import { useAppStore } from '@/store/useAppStore'

export const useColumnsStore = () => {
  const { updatedSelectedTasksAfterMove, getUpdatedSelectedTasksAfterMove } =
    useBoardContext()

  const { tasks, removeTask } = useTaskStore()

  const columns = useAppStore((state) => state.columns)
  const columnOrder = useAppStore((state) => state.columnOrder)
  const reorderColumn = useAppStore((state) => state.reorderColumns)
  const addColumn = useAppStore((state) => state.addColumn)
  const renameColumn = useAppStore((state) => state.renameColumn)
  const reorderTask = useAppStore((state) => state.reorderTask)
  const removeColumn = useAppStore((state) => state.removeColumn)

  const columnsWithTasks = useMemo(() => {
    return Object.fromEntries(
      Object.entries(columns).map(([id, column]) => [
        id,
        {
          ...column,
          tasks: column.taskIds.map((taskId) => tasks[taskId]).filter(Boolean),
        },
      ]),
    )
  }, [columns, tasks])

  const removeColumnWithTasks = (id: string) => {
    const column = columns[id]

    if (!column) return

    const taskIds = column.taskIds
    removeColumn(id)
    taskIds.forEach((taskId) => removeTask(taskId))
  }

  const removeColumnAndMoveTasks = (id: string) => {
    const column = columns[id]

    if (!column) return

    const taskIds = column.taskIds
    removeColumn(id)

    const firstColumnId = columnOrder.find((colId) => colId !== id)
    const firstColumn = firstColumnId ? columns[firstColumnId] : undefined

    if (firstColumn) {
      taskIds.forEach((taskId, index) => {
        reorderTask(
          id,
          firstColumn.id,
          taskId,
          firstColumn.taskIds.length + index,
        )
      })

      return
    }

    const newColumnId = addColumn({ title: 'Untitled' })
    taskIds.forEach((taskId, index) => {
      reorderTask(id, newColumnId, taskId, index)
    })
  }

  const moveSelectedTasks = (
    selectedTasks: TSelectedTask[],
    direction: TDirection,
  ) => {
    const updatedSelectedTasks = getUpdatedSelectedTasksAfterMove(
      selectedTasks,
      columnOrder,
      direction,
    )

    let order = 0

    updatedSelectedTasks.forEach(({ taskId, columnId, destColumnId }) => {
      const destColumn = columns[destColumnId]

      if (!destColumn) return

      const tasksCount = destColumn.taskIds.length

      reorderTask(columnId, destColumnId, taskId, tasksCount + order)
      order++
    })

    updatedSelectedTasksAfterMove(updatedSelectedTasks)
  }

  return {
    columnsWithTasks,
    columns,
    columnOrder,
    reorderColumn,
    addColumn,
    renameColumn,
    reorderTask,
    removeColumnWithTasks,
    removeColumnAndMoveTasks,
    moveSelectedTasks,
  }
}
