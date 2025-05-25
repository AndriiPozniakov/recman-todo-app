import { useEffect, useMemo, useRef, useState } from 'react'

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

import { useFuseSearch } from '@hooks/useFuseSearch'
import { cx } from 'cva'
import { isIOS } from 'react-device-detect'
import { createPortal } from 'react-dom'

import { getColumnData } from '@/utils/getColumnData'

import type { TPreviewState } from '@/types/previewState'

import { useBoardContext } from '@/contexts/useBoardContext'
import { useFiltersContext } from '@/contexts/useFiltersContext'
import { isDraggingAColumn, type TColumnWithTasks } from '@/types'

import { ColumnEndDropZone } from './components/ColumnEndDropZone'
import { ColumnHeader } from './components/ColumnHeader'
import { CreateNewTask } from './components/CreateNewTask'
import { IOSColumnPreview } from './components/IOSColumnPreview'
import { TaskCard } from './components/TaskCard'

interface ColumnProps {
  column: TColumnWithTasks
}

export const Column = (props: ColumnProps) => {
  const { column } = props
  const columnRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const { createNewTaskColumnId } = useBoardContext()
  const { statusFilter, globalSearchQuery } = useFiltersContext()

  const [isDragging, setIsDragging] = useState(false)
  const [previewState, setPreviewState] = useState<TPreviewState | null>(null)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  const data = getColumnData(column)

  const filteredTaksBySearch = useFuseSearch({
    list: column.tasks,
    search: globalSearchQuery,
    keys: ['title'],
  })

  const filteredTasksByStatus = useMemo(() => {
    return filteredTaksBySearch.filter((task) => {
      if (statusFilter === 'all') return true
      if (statusFilter === 'completed') return task.isCompleted
      if (statusFilter === 'incomplete') return !task.isCompleted
    })
  }, [filteredTaksBySearch, statusFilter])

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
    <div
      ref={columnRef}
      className={cx('relative flex w-72 select-none shrink-0 px-2', {
        isolate: previewState?.type === 'default',
      })}
    >
      <div
        className={cx(
          'flex w-full flex-grow flex-col duration-300 ease-in-out',
          {
            'opacity-60': isDragging,
          },
        )}
      >
        <ColumnHeader ref={headerRef} column={column} />

        <div className="-mx-2 flex h-full flex-col gap-4 overflow-auto px-2 pb-8 pt-4">
          {createNewTaskColumnId && column.id === createNewTaskColumnId && (
            <CreateNewTask columnId={column.id} />
          )}

          {filteredTasksByStatus.map((task) => (
            <TaskCard key={task.id} columnId={column.id} task={task} />
          ))}

          <ColumnEndDropZone
            columnId={column.id}
            intent={filteredTasksByStatus.length ? 'transparent' : 'grey-400'}
          />
        </div>
      </div>

      {closestEdge && <DropIndicator edge={closestEdge} gap="0px" />}
      {previewState?.type === 'ios'
        ? createPortal(
            <IOSColumnPreview title={column.title} />,
            previewState.container,
          )
        : null}
    </div>
  )
}
