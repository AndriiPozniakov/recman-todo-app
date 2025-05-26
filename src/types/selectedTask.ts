export type TSelectedTask = {
  taskId: string
  columnId: string
}

export type TMoveSelectedTask = TSelectedTask & {
  destColumnId: string
}
