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

import { useTaskStore } from '@hooks/useTaskStore.ts'
import { cva, cx } from 'cva'

import { getTaskData } from '@/utils/getTaskData'

import { isDraggingATask, type TTask } from '@/types'

import { DropdownMenu } from '@components/DropdownMenu.tsx'
import { Icon } from '@components/Icon.tsx'

const taskCardClassName = cva({
  base: 'grid gap-2 rounded border border-grey-500 p-4 duration-300 ease-in-out',
  variants: {
    isDragging: {
      true: 'opacity-50',
      false: '',
    },
    isCompleted: {
      true: 'opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    { isCompleted: false, isDragging: false, className: 'opacity-100' },
  ],
  defaultVariants: { isDragging: false, isCompleted: false },
})

interface TaskCardProps {
  columnId: string
  task: TTask
}

export const TaskCard = (props: TaskCardProps) => {
  const { columnId, task } = props
  const { isCompleted } = task

  const { toggleComplete } = useTaskStore()

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

  const handleOnSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'toggleComplete':
        toggleComplete(task.id)
        break
    }
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className={taskCardClassName({
          isDragging,
          isCompleted,
        })}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <h3 className="flex-grow truncate font-medium">{task.title}</h3>
          <DropdownMenu
            triggerContent={<Icon name="icon-three-dots" />}
            onSelect={handleOnSelect}
            menuItems={[
              {
                eventKey: 'toggleComplete',
                title: `Mark ${isCompleted ? 'incomplete' : 'complete'}`,
              },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <div
            className={cx(
              'size-2 rounded-full duration-300 ease-in-out',
              isCompleted ? 'bg-green-600' : 'bg-yellow-600',
            )}
          />
          <div className="text-sm">
            {isCompleted ? 'Completed' : 'Incomplete'}
          </div>
        </div>
      </div>
      {closestEdge && <DropIndicator edge={closestEdge} gap="16px" />}
    </div>
  )
}
