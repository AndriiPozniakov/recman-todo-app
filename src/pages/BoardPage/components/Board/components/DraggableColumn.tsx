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

import { getColumnData } from '@/utils/getColumnData.ts'

import { type TColumn } from '@/types'

interface ColumnProps {
  column: TColumn
}

export const DraggableColumn = (props: ColumnProps) => {
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
    <div ref={columnRef} className={cx('relative flex w-72 flex-shrink-0')}>
      <div
        className={cx(
          'flex flex-grow flex-col overflow-hidden rounded border border-grey-500 duration-300 ease-in-out',
          {
            'opacity-60': isDragging,
          },
        )}
      >
        <h2
          ref={headerRef}
          className="flex gap-2 border-b border-grey-500 bg-grey-400 p-4 font-medium"
        >
          {column.title}
        </h2>
      </div>
      {closestEdge && <DropIndicator edge={closestEdge} gap="16px" />}
    </div>
  )
}
