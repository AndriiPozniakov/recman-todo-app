import { useEffect, useRef, useState } from 'react'

import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import { cva, type VariantProps } from 'cva'

import { getColumnEndDropZoneData } from '@/utils/getColumnEndDropZoneData'

import { isDraggingATask } from '@/types'

const columnEndDropZoneClassName = cva({
  base: 'flex-grow rounded duration-300 ease-in-out',
  variants: {
    intent: {
      transparent: '',
      'grey-400': '',
    },
    hover: {
      true: '',
    },
  },
  compoundVariants: [
    { intent: 'transparent', hover: false, className: 'bg-transparent' },
    { intent: 'grey-400', hover: false, className: 'bg-grey-400' },
    {
      intent: ['transparent', 'grey-400'],
      hover: true,
      className: 'bg-blue-50',
    },
  ],
  defaultVariants: {
    intent: 'transparent',
  },
})

interface ColumnEndDropZoneProps
  extends VariantProps<typeof columnEndDropZoneClassName> {
  columnId: string
  className?: string
}

export const ColumnEndDropZone = (props: ColumnEndDropZoneProps) => {
  const { columnId, intent, className } = props
  const ref = useRef<HTMLDivElement | null>(null)

  const [isOverDropZone, setIsOverDropZone] = useState(false)

  const data = getColumnEndDropZoneData(columnId)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    return dropTargetForElements({
      element: element,
      canDrop: isDraggingATask,
      getIsSticky: () => true,
      getData: () => data,
      onDragEnter: () => setIsOverDropZone(true),
      onDragLeave: () => setIsOverDropZone(false),
      onDrop: () => setIsOverDropZone(false),
    })
  }, [data])

  return (
    <div
      ref={ref}
      className={columnEndDropZoneClassName({
        intent,
        hover: isOverDropZone,
        className,
      })}
    />
  )
}
