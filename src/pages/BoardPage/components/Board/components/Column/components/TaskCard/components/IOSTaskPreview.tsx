import type { TTask } from '@/types'

interface TIOSTaskPreviewProps {
  task: TTask
}

export const IOSTaskPreview = (props: TIOSTaskPreviewProps) => {
  const { task } = props

  return (
    <div className="grid h-[94px] w-[272px] font-medium border border-grey-500 bg-white px-4 pb-4 pt-2 text-start">
      <div className='flex items-center h-12'>{task.title}</div>
    </div>
  )
}
