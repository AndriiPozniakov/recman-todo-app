import type { TTask } from '@/types'

interface TaskCardProps {
  task: TTask
}

export const TaskCard = (props: TaskCardProps) => {
  const { task } = props

  return (
    <div className="rounded border border-grey-500 p-4">
      <h3 className="font-medium">{task.title}</h3>
    </div>
  )
}
