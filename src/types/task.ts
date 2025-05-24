export const taskKey = Symbol('task')

export type TTask = {
  id: string
  title: string
}

export type TTaskData = {
  [taskKey]: true
  todo: TTask
}
