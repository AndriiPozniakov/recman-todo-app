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

import { useTaskStore } from '@hooks/useTaskStore'
import { cva, cx } from 'cva'

import { getTaskData } from '@/utils/getTaskData'

import type { TDropdownItem } from '@/types/dropdownItem.ts'

import { useBoardContext } from '@/contexts/useBoardContext'
import { isDraggingATask, type TTask } from '@/types'

import { DropdownMenu } from '@components/DropdownMenu'
import { Icon } from '@components/Icon'

const taskCardClassName = cva({
  base: 'grid w-full gap-2 rounded border border-grey-500 bg-white p-4 text-start duration-300 ease-in-out',
  variants: {
    isDragging: {
      true: 'opacity-50',
      false: '',
    },
    isCompleted: {
      true: 'opacity-50',
      false: '',
    },
    isSelected: {
      true: '!border-blue-200 !bg-blue-50',
    },
    isSelectMode: {
      true: 'hocus:border-blue-200',
    },
  },
  compoundVariants: [
    { isCompleted: false, isDragging: false, className: 'opacity-100' },
  ],
  defaultVariants: {
    isDragging: false,
    isCompleted: false,
    isSelected: false,
    isSelectMode: false,
  },
})

interface TaskCardProps {
  columnId: string
  task: TTask
}

export const TaskCard = (props: TaskCardProps) => {
  const { columnId, task } = props
  const { isCompleted } = task

  const { toggleComplete, removeTask } = useTaskStore()
  const { selectTask, unselectTask, isTaskSelected, isSelectMode } =
    useBoardContext()

  const [isDragging, setIsDragging] = useState(false)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)
  const ref = useRef<HTMLElement>(null)

  const setRef = (el: HTMLDivElement | HTMLButtonElement | null) => {
    ref.current = el
  }

  const data = getTaskData(columnId, task)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    return combine(
      draggable({
        element: element,
        canDrag: () => !isSelectMode,
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
  }, [data, isSelectMode])

  const handleOnSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'toggleComplete':
        toggleComplete(task.id)
        break
      case 'delete-task':
        removeTask(columnId, task.id)
        break
    }
  }

  const isSelected = isTaskSelected(task.id)

  const Component = isSelectMode ? 'button' : 'div'
  const componentProps = isSelectMode
    ? {
        onClick: () =>
          isSelected ? unselectTask(task.id) : selectTask(task.id),
        'aria-checked': isSelected,
        role: 'checkbox',
      }
    : {}

  const menuItems: TDropdownItem[] = [
    {
      eventKey: 'toggleComplete',
      title: `Mark ${isCompleted ? 'incomplete' : 'complete'}`,
    },
    { type: 'divider' },
    {
      eventKey: 'delete-task',
      title: 'Delete task',
    },
  ]

  return (
    <div className="relative">
      <Component
        ref={setRef}
        className={taskCardClassName({
          isDragging,
          isCompleted,
          isSelectMode,
          isSelected,
        })}
        {...componentProps}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <h3 className="flex-grow truncate font-medium">{task.title}</h3>
          <DropdownMenu
            disabled={isSelectMode}
            triggerContent={<Icon name="icon-three-dots" />}
            onSelect={handleOnSelect}
            menuItems={menuItems}
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
      </Component>
      {closestEdge && <DropIndicator edge={closestEdge} gap="16px" />}
    </div>
  )
}
