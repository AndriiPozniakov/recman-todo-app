import { useCallback, useEffect, useRef } from 'react'

import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  type ElementDragPayload,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/types'

import { useColumnsStore } from '@hooks/useColumnsStore'

import { isColumnEndDropZoneData } from '@/types/columnEndDropZone'

import {
  isColumnData,
  isDraggingAColumn,
  isDraggingATask,
  isTaskData,
} from '@/types'

import { Column } from './components/Column'
import { CreateNewColumn } from './components/CreateNewColumn'

type DragArgs = {
  source: ElementDragPayload
  location: DragLocationHistory
}

export const Board = () => {
  const { columnsWithTasks, columnOrder, reorderColumn, reorderTask } =
    useColumnsStore()

  const scrollableRef = useRef<HTMLDivElement | null>(null)

  const handleColumnReorder = useCallback(
    ({ source, location }: DragArgs) => {
      const sourceColumn = source.data
      if (!isColumnData(sourceColumn)) {
        return
      }

      const destinationTarget = location.current.dropTargets[0]

      if (!destinationTarget) {
        return
      }
      const destinationColumn = destinationTarget.data

      if (!isColumnData(destinationColumn)) {
        return
      }

      const sourceColumnId = sourceColumn.column.id
      const destinationColumnId = destinationColumn.column.id

      const sourceIdx = columnOrder.indexOf(sourceColumnId)
      const destinationIdx = columnOrder.indexOf(destinationColumnId)

      const closestEdgeOfTarget: Edge | null = extractClosestEdge(
        destinationTarget.data,
      )

      const newPositionIdx = getReorderDestinationIndex({
        startIndex: sourceIdx,
        indexOfTarget: destinationIdx,
        closestEdgeOfTarget,
        axis: 'horizontal',
      })

      reorderColumn(sourceIdx, newPositionIdx)
    },
    [columnOrder, reorderColumn],
  )

  const handleTaskReorder = useCallback(
    ({ source, location }: DragArgs) => {
      const sourceTask = source.data
      if (!isTaskData(sourceTask)) {
        return
      }

      const destinationTarget = location.current.dropTargets[0]

      if (!destinationTarget) {
        return
      }

      const destinationData = destinationTarget.data

      if (isColumnEndDropZoneData(destinationData)) {
        const sourceColumnId = sourceTask.columnId
        const destinationColumnId = destinationData.columnId

        const destinationItemIdx =
          columnsWithTasks[destinationColumnId].tasks.length

        reorderTask(
          sourceColumnId,
          destinationColumnId,
          sourceTask.task.id,
          destinationItemIdx,
        )

        return
      }

      if (isTaskData(destinationData)) {
        const sourceColumnId = sourceTask.columnId
        const destinationColumnId = destinationData.columnId

        const sourceItemIdx = columnsWithTasks[sourceColumnId].tasks.indexOf(
          sourceTask.task,
        )

        const destinationItemIdx = columnsWithTasks[
          destinationColumnId
        ].tasks.indexOf(destinationData.task)

        if (sourceItemIdx === -1 || destinationItemIdx === -1) {
          return
        }

        const closestEdgeOfTarget: Edge | null = extractClosestEdge(
          destinationTarget.data,
        )

        // Same column
        if (sourceColumnId === destinationColumnId) {
          const destinationPosition = getReorderDestinationIndex({
            startIndex: sourceItemIdx,
            indexOfTarget: destinationItemIdx,
            closestEdgeOfTarget: closestEdgeOfTarget,
            axis: 'vertical',
          })

          reorderTask(
            sourceColumnId,
            destinationColumnId,
            sourceTask.task.id,
            destinationPosition,
          )

          return
        }

        const destinationPosition =
          closestEdgeOfTarget === 'bottom'
            ? destinationItemIdx + 1
            : destinationItemIdx

        reorderTask(
          sourceColumnId,
          destinationColumnId,
          sourceTask.task.id,
          destinationPosition,
        )
      }
    },
    [columnsWithTasks, reorderTask],
  )

  useEffect(() => {
    return combine(
      monitorForElements({
        canMonitor: isDraggingAColumn,
        onDrop: handleColumnReorder,
      }),

      monitorForElements({
        canMonitor: isDraggingATask,
        onDrop: handleTaskReorder,
      }),
    )
  }, [handleColumnReorder, handleTaskReorder])

  useEffect(() => {
    const scrollableElement = scrollableRef.current

    if (!scrollableElement) return

    return autoScrollForElements({
      element: scrollableElement,
    })
  }, [])

  return (
    <div
      ref={scrollableRef}
      className="flex flex-row overflow-auto px-3 pt-8 md:px-7"
    >
      {columnOrder.map((columnId) => {
        const column = columnsWithTasks[columnId]

        return <Column key={column.id} column={column} />
      })}

      <CreateNewColumn />
    </div>
  )
}
