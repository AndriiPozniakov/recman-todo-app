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
import { centerUnderPointer } from '@atlaskit/pragmatic-drag-and-drop/element/center-under-pointer'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'

import { useTaskStore } from '@hooks/useTaskStore'
import { cva, cx } from 'cva'
import { isIOS } from 'react-device-detect'
import { createPortal } from 'react-dom'

import { getTaskData } from '@/utils/getTaskData'

import type { TDropdownItem } from '@/types/dropdownItem'
import type { TPreviewState } from '@/types/previewState'

import { useBoardContext } from '@/contexts/useBoardContext'
import { isDraggingATask, type TTask } from '@/types'

import { DropdownMenu } from '@components/DropdownMenu'
import { Icon } from '@components/Icon'

import { EditableTaskTitle } from './components/EditableTaskTitle'
import { IOSTaskPreview } from './components/IOSTaskPreview'

const taskCardClassName = cva({
  base: 'grid w-full cursor-pointer rounded border border-grey-500 bg-white px-4 pb-4 pt-2 text-start duration-300 ease-in-out hocus:border-blue-200',
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
    isGeneratePreview: {
      true: 'isolate',
    },
  },
  compoundVariants: [
    { isCompleted: false, isDragging: false, className: 'opacity-100' },
  ],
  defaultVariants: {
    isDragging: false,
    isCompleted: false,
    isSelected: false,
  },
})

interface TaskCardProps {
  columnId: string
  task: TTask
}

export const TaskCard = (props: TaskCardProps) => {
  const { columnId, task } = props
  const { isCompleted } = task

  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const { toggleComplete, removeTaskFromColumn } = useTaskStore()
  const { selectTask, unselectTask, isTaskSelected, isSelectMode } =
    useBoardContext()

  const [isDragging, setIsDragging] = useState(false)
  const [previewState, setPreviewState] = useState<TPreviewState | null>(null)
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
        canDrag: () => !isSelectMode && !isTitleEditing,
        getInitialData: () => data,
        onDragStart: () => {
          setIsDragging(true)
        },
        onDrop() {
          setIsDragging(false)
          setPreviewState(null)
        },
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          if (!isIOS) {
            setPreviewState({ type: 'default' })
            return
          }

          setCustomNativeDragPreview({
            getOffset: centerUnderPointer,
            render: ({ container }) => {
              setPreviewState({
                type: 'ios',
                container,
              })
              return () => setPreviewState(null)
            },
            nativeSetDragImage,
          })
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
  }, [data, isSelectMode, isTitleEditing])

  const handleOnSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'rename':
        setIsTitleEditing(true)
        break
      case 'toggle-complete':
        toggleComplete(task.id)
        break
      case 'delete-task':
        removeTaskFromColumn(columnId, task.id)
        break
    }
  }

  const isSelected = isTaskSelected(task.id)

  const Component = isSelectMode ? 'button' : 'div'
  const componentProps = isSelectMode
    ? {
        onClick: () =>
          isSelected
            ? unselectTask(task.id)
            : selectTask({ columnId, taskId: task.id }),
        'aria-checked': isSelected,
        role: 'checkbox',
      }
    : {}

  const menuItems: TDropdownItem[] = [
    {
      eventKey: 'rename',
      title: 'Rename',
      iconName: 'icon-pen',
    },
    {
      eventKey: 'toggle-complete',
      title: `Mark ${isCompleted ? 'incomplete' : 'complete'}`,
    },
    { type: 'divider' },
    {
      eventKey: 'delete-task',
      title: 'Delete task',
    },
  ]

  return (
    <div className="relative select-none">
      <Component
        ref={setRef}
        className={taskCardClassName({
          isDragging,
          isCompleted,
          isSelected,
          isGeneratePreview: previewState?.type === 'default',
        })}
        {...componentProps}
      >
        <div className="-ml-1 grid grid-cols-[1fr_auto] items-center gap-2">
          <EditableTaskTitle
            task={task}
            isEditing={isTitleEditing}
            onEditingChange={setIsTitleEditing}
          />

          {!isSelectMode && (
            <DropdownMenu
              disabled={isSelectMode}
              triggerContent={<Icon name="icon-three-dots" />}
              onSelect={handleOnSelect}
              menuItems={menuItems}
            />
          )}
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
      {previewState?.type === 'ios'
        ? createPortal(<IOSTaskPreview task={task} />, previewState.container)
        : null}
    </div>
  )
}
