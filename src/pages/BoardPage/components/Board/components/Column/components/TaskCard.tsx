import { useEffect, useRef, useState } from 'react'

import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import { cx } from 'cva'

import { getTaskData } from '@/utils/getTaskData'

import { isDraggingATask, type TTask } from '@/types'

interface TaskCardProps {
  columnId: string
  task: TTask
}

export const TaskCard = (props: TaskCardProps) => {
  const { columnId, task } = props

  const [isDragging, setIsDragging] = useState(false)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  const data = getTaskData(columnId, task)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    return combine(
      draggable({
        element: element,
        getInitialData: () => data,
        onDragStart: () => {
          setIsDragging(true)
        },
        onDrop() {
          setIsDragging(false)
        },
      }),
      dropTargetForElements({
        element: element,
        canDrop: isDraggingATask,
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          })
        },
        onDragEnter: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data))
        },
        onDrag: (args) => {
          const closestEdge: Edge | null = extractClosestEdge(args.self.data)
          setClosestEdge(closestEdge)
        },
        onDragLeave: () => {
          setClosestEdge(null)
        },
        onDrop: () => {
          setClosestEdge(null)
        },
      }),
    )
  }, [data])

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cx(
          'rounded border border-grey-500 p-4 duration-300 ease-in-out',
          isDragging ? 'opacity-50' : 'opacity-100',
        )}
      >
        <h3 className="font-medium">{task.title}</h3>
      </div>
      {closestEdge && <DropIndicator edge={closestEdge} gap="16px" />}
    </div>
  )
}
