import { useTaskStore } from '@hooks/useTaskStore'

import { useAppStore } from '@/store/useAppStore'
import type { TColumn, TTask } from '@/types'

const mapColumnsWithTasks = (
  columns: Record<string, TColumn>,
  tasks: Record<string, TTask>,
) => {
  return Object.fromEntries(
    Object.entries(columns).map(([id, column]) => [
      id,
      {
        ...column,
        tasks: column.taskIds.map((taskId) => tasks[taskId]).filter(Boolean),
      },
    ]),
  )
}

export const useColumnsStore = () => {
  const { tasks } = useTaskStore()

  const columns = useAppStore((state) => state.columns)
  const columnOrder = useAppStore((state) => state.columnOrder)
  const reorderColumn = useAppStore((state) => state.reorderColumns)
  const addColumn = useAppStore((state) => state.addColumn)
  const renameColumn = useAppStore((state) => state.renameColumn)
  const reorderTask = useAppStore((state) => state.reorderTask)

  const columnsWithTasks = mapColumnsWithTasks(columns, tasks)

  return {
    columnsWithTasks,
    columns,
    columnOrder,
    reorderColumn,
    addColumn,
    renameColumn,
    reorderTask,
  }
}
