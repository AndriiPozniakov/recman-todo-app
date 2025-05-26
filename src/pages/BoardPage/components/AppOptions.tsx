import { useColumnsStore } from '@hooks/useColumnsStore'
import { useTaskStore } from '@hooks/useTaskStore'

import type { TDropdownItem } from '@/types/dropdownItem'

import { useBoardContext } from '@/contexts/useBoardContext'
import { useFiltersContext } from '@/contexts/useFiltersContext'

import { DropdownMenu } from '@components/DropdownMenu'
import { Icon } from '@components/Icon'

const COMPLETED_EVENT_KEY = 'completed'
const UNCOMPLETED_EVENT_KEY = 'incomplete'

export const AppOptions = () => {
  const { columnOrder } = useColumnsStore()
  const { removeBulkTasks, markSelectedAsCompleted, markSelectedAsIncomplete } =
    useTaskStore()

  const { statusFilter, toggleStatusFilter } = useFiltersContext()
  const { selectedTasks, clearSelectedTasks, createNewTask } = useBoardContext()

  const menuItems: TDropdownItem[] = [
    { eventKey: 'add-new-task', title: 'Add new task', iconName: 'icon-plus' },
    { type: 'divider' },
    {
      eventKey: 'completed',
      title: 'Filter completed',
      iconName: statusFilter === COMPLETED_EVENT_KEY ? 'icon-check' : undefined,
    },
    {
      eventKey: 'incomplete',
      title: 'Filter incomplete',
      iconName:
        statusFilter === UNCOMPLETED_EVENT_KEY ? 'icon-check' : undefined,
    },
    { type: 'divider' },
    {
      eventKey: 'completed-all-selected',
      title: 'Mark all tasks as completed',
    },
    {
      eventKey: 'incomplete-all-selected',
      title: 'Mark all tasks as incomplete',
    },
    { eventKey: 'delete-all-selected', title: 'Remove all selected tasks' },
  ]

  const handleOnSelect = (eventKey: string) => {
    switch (eventKey) {
      case 'add-new-task':
        {
          const firstColumnId = columnOrder[0]
          if (!firstColumnId) return

          createNewTask(firstColumnId)
        }
        break
      case 'completed':
      case 'incomplete':
        toggleStatusFilter(eventKey)
        break
      case 'completed-all-selected':
        markSelectedAsCompleted(selectedTasks)
        clearSelectedTasks()
        break
      case 'incomplete-all-selected':
        markSelectedAsIncomplete(selectedTasks)
        clearSelectedTasks()
        break
      case 'delete-all-selected':
        removeBulkTasks(selectedTasks)
        clearSelectedTasks()
        break
    }
  }

  return (
    <DropdownMenu
      triggerContent={<Icon name="icon-gear" />}
      onSelect={handleOnSelect}
      menuItems={menuItems}
    />
  )
}
