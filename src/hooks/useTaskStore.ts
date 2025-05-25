import type { TSelectedTask } from '@/types/selectedTask.ts'

import { useAppStore } from '@/store/useAppStore'

export const useTaskStore = () => {
  const tasks = useAppStore((state) => state.tasks)
  const addTask = useAppStore((state) => state.addTask)
  const removeTask = useAppStore((state) => state.removeTask)
  const toggleComplete = useAppStore((state) => state.toggleComplete)
  const renameTask = useAppStore((state) => state.renameTask)
  const addTaskToColumn = useAppStore((state) => state.addTaskToColumn)
  const removeTaskFromColumn = useAppStore(
    (state) => state.removeTaskFromColumn,
  )

  const handleRemoveTask = (columnId: string, taskId: string) => {
    removeTask(taskId)
    removeTaskFromColumn(columnId, taskId)
  }

  const handleAddNewTask = (columnId: string, title: string) => {
    const newTaskId = addTask({ title })
    addTaskToColumn(columnId, newTaskId)
  }

  const handleRemoveBulkTasks = (tasksToRemove: TSelectedTask[]) => {
    tasksToRemove.forEach(({ columnId, taskId }) => {
      handleRemoveTask(columnId, taskId)
    })
  }

  return {
    tasks,
    addTask: handleAddNewTask,
    removeTask,
    removeTaskFromColumn: handleRemoveTask,
    removeBulkTasks: handleRemoveBulkTasks,
    toggleComplete,
    renameTask,
  }
}
