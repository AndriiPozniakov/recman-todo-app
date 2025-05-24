import { useEffect, useRef } from 'react'

import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useColumnsStore } from '@hooks/useColumnsStore.ts'

import { isColumnData, isDraggingAColumn } from '@/types'

import { DraggableColumn } from './components/DraggableColumn.tsx'

export const Board = () => {
  const { columns, columnOrder, reorderColumn } = useColumnsStore()

  const scrollableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return combine(
      monitorForElements({
        canMonitor: isDraggingAColumn,
        onDrop: ({ source, location }) => {
          const draggingColumn = source.data
          if (!isColumnData(draggingColumn)) {
            return
          }

          const dropTarget = location.current.dropTargets[0]

          if (!dropTarget) {
            return
          }
          const targetColumn = dropTarget.data

          if (!isColumnData(targetColumn)) {
            return
          }

          const draggingColumnId = draggingColumn.column.id
          const targetColumnId = targetColumn.column.id

          const draggingIdx = columnOrder.indexOf(draggingColumnId)
          const targetIdx = columnOrder.indexOf(targetColumnId)

          const closestEdgeOfTarget: Edge | null = extractClosestEdge(
            dropTarget.data,
          )

          const finishIndex = getReorderDestinationIndex({
            startIndex: draggingIdx,
            indexOfTarget: targetIdx,
            closestEdgeOfTarget,
            axis: 'horizontal',
          })

          reorderColumn(draggingIdx, finishIndex)
        },
      }),
    )
  }, [columnOrder, reorderColumn])

  useEffect(() => {
    const scrollableElement = scrollableRef.current

    if (!scrollableElement) return

    return autoScrollForElements({
      element: scrollableElement,
    })
  }, [])

  return (
    <div ref={scrollableRef} className="flex flex-row gap-4 overflow-auto p-8">
      {columnOrder.map((columnId) => {
        const column = columns[columnId]

        return <DraggableColumn key={column.id} column={column} />
      })}
    </div>
  )
}
