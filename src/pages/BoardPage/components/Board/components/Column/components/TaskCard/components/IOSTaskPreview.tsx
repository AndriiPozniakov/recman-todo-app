import type { TTask } from '@/types'

interface TIOSTaskPreviewProps {
  task: TTask
}

export const IOSTaskPreview = (props: TIOSTaskPreviewProps) => {
  const { task } = props

  return (
    <div className="grid h-[94px] w-[272px] border border-grey-500 bg-white px-4 pb-4 pt-2 text-start">
      {task.title}
    </div>
  )
}
