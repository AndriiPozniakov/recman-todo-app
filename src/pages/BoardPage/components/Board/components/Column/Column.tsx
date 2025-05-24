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

import { getColumnData } from '@/utils/getColumnData'

import { isDraggingAColumn, type TColumnWithTasks } from '@/types'

import { ColumnEndDropZone } from './components/ColumnEndDropZone'
import { EditableColumnTitle } from './components/EditableColumnTitle'
import { TaskCard } from './components/TaskCard'

interface ColumnProps {
  column: TColumnWithTasks
}

export const Column = (props: ColumnProps) => {
  const { column } = props
  const columnRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  const data = getColumnData(column)

  useEffect(() => {
    const header = headerRef.current
    const column = columnRef.current

    if (!header || !column) return

    return combine(
      draggable({
        element: column,
        dragHandle: header,
        getInitialData: () => data,
        onDragStart: () => {
          setIsDragging(true)
        },
        onDrop() {
          setIsDragging(false)
        },
      }),
      dropTargetForElements({
        element: column,
        canDrop: isDraggingAColumn,
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['left', 'right'],
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
    <div ref={columnRef} className="relative flex w-72 shrink-0 px-2">
      <div
        className={cx(
          'flex w-full flex-grow flex-col duration-300 ease-in-out',
          {
            'opacity-60': isDragging,
          },
        )}
      >
        <EditableColumnTitle ref={headerRef} column={column} />

        <div className="-mx-2 flex h-full flex-col gap-4 overflow-auto px-2 pb-8 pt-4">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} columnId={column.id} task={task} />
          ))}

          <ColumnEndDropZone
            columnId={column.id}
            intent={column.tasks.length ? 'transparent' : 'grey-400'}
          />
        </div>
      </div>

      {closestEdge && <DropIndicator edge={closestEdge} gap="0px" />}
    </div>
  )
}
