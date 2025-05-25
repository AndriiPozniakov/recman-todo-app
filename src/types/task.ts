export const taskKey = Symbol('task')

export type TTask = {
  id: string
  title: string
  isCompleted: boolean
}

export type TTaskData = {
  [taskKey]: true
  columnId: string
  task: TTask
}

export function isTaskData(
  value: Record<string | symbol, unknown>,
): value is TTaskData {
  return Boolean(value[taskKey])
}

export function isDraggingATask({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isTaskData(source.data)
}
