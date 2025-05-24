import { taskKey, type TTaskData, type TTask } from '@/types'

export const getTaskData = (columnId: string, task: TTask): TTaskData => {
  return {
    [taskKey]: true,
    columnId,
    task,
  }
}
